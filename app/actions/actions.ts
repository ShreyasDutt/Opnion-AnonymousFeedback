'use server'

import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect"
import Space from "../db/models/space.model";
import User from "../db/models/user.model";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import Feedback from "../db/models/feedback.model";
import { Types } from "mongoose";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export interface SpaceInterface {
    spacename: string;
    title: string;
    message: string;
    questions: string[];
    color: string;
    SpaceLogo: string;  
    imageId: string;
    rounded: boolean;
}

export interface SpaceUpdateInterface {
    SpaceId: unknown;
    spacename: string;
    title: string;
    message: string;
    questions: string[];
    color: string;
    SpaceLogo: string;  
    imageId: string;
    rounded: boolean;
}

const generateUniqueSpacename = async (base: string) => {
  const slugBase = base.trim().toLowerCase().replaceAll(' ', '-');
  let uniqueSlug = slugBase;
  let counter = 1;

  while (await Space.exists({ spacename: uniqueSlug })) {
    uniqueSlug = `${slugBase}${counter}`;
    counter++;
  }

  return uniqueSlug;
};

export const CreateSpace = async({spacename, title, message, questions, color, SpaceLogo, imageId,rounded}:SpaceInterface) => {
    const { userId } = await auth();
    console.log('userId:', userId);
    try {
        await dbConnect();
        const FoundUser = await User.findOne({ clerkId: userId });        

        if (!FoundUser) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }

         const newSpacename = await generateUniqueSpacename(spacename);

        const CreatedSpace = await Space.create({
            spacename: newSpacename,
            title,
            message,
            questions,
            color,
            SpaceLogo,
            imageId,
            rounded,
            createdby: FoundUser._id,
        });
        await User.findByIdAndUpdate(
            FoundUser._id,
            { $addToSet: { spaces: CreatedSpace._id } }
        );

        revalidatePath('/dashboard');
        return { success: true, message: 'Space created' };
        
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

export const UpdateSpace = async({spacename, title, message, questions, color, SpaceLogo, imageId,rounded}:SpaceInterface) => {

    try {
        await Space.findOneAndUpdate({spacename},{
            title,
            message,
            questions,
            color,
            SpaceLogo,
            imageId,
            rounded,
        });

        revalidatePath(`/dashboard/${spacename}`);
        return { success: true, message: 'Space updated' };
        
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Error updating space' };
    }
}

export const GetSpaces = async() => {
    const { userId } = await auth();
    try {
        await dbConnect();
        const FoundUser = await User.findOne({ clerkId: userId });
        if (!FoundUser) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }
        const spaces = await Space.find({ createdby: FoundUser._id }).populate('createdby');
        return { success: true, spaces: spaces};
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

export const DeleteSpace = async(spaceId: string) => {
    try{
        await dbConnect();
        const foundSpace = await Space.findByIdAndDelete(spaceId);
        if(foundSpace){
        await cloudinary.uploader.destroy(foundSpace.imageId);
        }
        revalidatePath('/dashboard');
        return { success: true, message: 'Space deleted' };
    }catch(err){
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

export const DuplicateSpace = async(spaceId: string) => {
    try {
        await dbConnect();
        const FoundSpace = await Space.findById(spaceId);
        if(FoundSpace?.spacename.endsWith('-copy')){
            return { success: false, message: "Cant duplicate a duplicated space" };
        }
        const DuplicateExists = await Space.findOne({ spacename: FoundSpace?.spacename + '-copy' });
        if (DuplicateExists) {
            return { success: false, message: 'Space can be duplicated only once' };
        }
        await Space.create({
            spacename: FoundSpace?.spacename + '-copy',
            title: FoundSpace?.title,
            SpaceLogo: FoundSpace?.SpaceLogo,
            imageId: FoundSpace?.imageId,
            rounded: FoundSpace?.rounded,
            message: FoundSpace?.message,
            questions: FoundSpace?.questions,
            color: FoundSpace?.color,
            createdby: FoundSpace?.createdby,
            feedbacks: FoundSpace?.feedbacks,
        })
        revalidatePath('/dashboard');
        return { success: true, message: 'Space duplicated' };
    } catch (error) {
        console.log('Duplication Error : '+error);
        return { success: false, message: 'Something went wrong' };
    }
}

export const GetUser = async() => {
    const { userId } = await auth();
    try {
        await dbConnect();
        const FoundUser = await User.findOne({ clerkId: userId })
        return { success: true, user: FoundUser };
    }catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

export const GetSpace = async(spacename: string) => {
    try{
        await dbConnect();
        const FoundSpace = await Space.findOne({ spacename: spacename }).populate('feedbacks');
        if(!FoundSpace){
            return { success: false, message: 'Space not found' };
        }
        else{
        FoundSpace.views = FoundSpace.views + 1;
        await FoundSpace.save();
        return { success: true, space: FoundSpace };
        }
    }catch(err){
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

export const SubmitFeedback = async (spacename: string, message: string) => {
    try {
        await dbConnect();
        const FoundSpace = await Space.findOne({ spacename });

        if (!FoundSpace) {
            return { success: false, message: 'Space not found' };
        }

        const CreatedFeedback = await Feedback.create({ message });

        FoundSpace.feedbacks = FoundSpace.feedbacks || [];
        FoundSpace.feedbacks.push(CreatedFeedback._id as Types.ObjectId);        
        await FoundSpace.save();

        return { success: true , message: 'Feedback submitted successfully' };
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
};

export const DeleteFeedback = async (feedbackId: string) => {
    try {
        await dbConnect();
        await Feedback.findByIdAndDelete(feedbackId);
        revalidatePath('/dashboard');
        return { success: true, message: 'Feedback deleted' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error Deleteing Feedback' };

    }
}

export const UpdateSettings = async (Accepting:boolean,spacename:string) =>{
    console.log("Update Setting !!! - "+Accepting,spacename);
    try {
        await dbConnect();
        const FoundSpace = await Space.findOne({ spacename });
        if(!FoundSpace){
            return { success: false, message: 'Space not found' };
        }
        if(FoundSpace?.isAcceptingFeedback === Accepting){
            return {success: 'same'};
        }
        FoundSpace.isAcceptingFeedback = Accepting;
        await FoundSpace.save();
        revalidatePath('/dashboard/'+spacename);
        return { success: true, message: 'Settings Updated' };
    }catch(error){
        console.log(error);
        return { success: false, message: 'Error Updating Settings' };
    }
}