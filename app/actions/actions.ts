'use server'

import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect"
import Space from "../db/models/space.model";
import User from "../db/models/user.model";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

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

export const CreateSpace = async({spacename, title, message, questions, color, SpaceLogo, imageId,rounded}:SpaceInterface) => {
    const { userId } = await auth();
    console.log('userId:', userId);
    let newSpacename = '';
    try {
        await dbConnect();
        const FoundUser = await User.findOne({ clerkId: userId });
        const FoundSpace = await Space.find({spacename: spacename});
        
        if (!FoundUser) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }
        if (FoundSpace) {
            newSpacename = spacename.trim().toLowerCase().replaceAll(' ','-')+(FoundSpace.length+1);
            console.log(newSpacename);
        }
        else{newSpacename = spacename.trim().toLowerCase().replaceAll(' ','-');}

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
            message: FoundSpace?.message,
            questions: FoundSpace?.questions,
            color: FoundSpace?.color,
            createdby: FoundSpace?.createdby,
            feedbacks: FoundSpace?.feedbacks,
        })
        revalidatePath('/dashboard');
        return { success: true, message: 'Space duplicated' };
    } catch (error) {
        console.log(error);
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
        const FoundSpace = await Space.findOne({ spacename: spacename });
        if(!FoundSpace){
            return { success: false, message: 'Space not found' };
        }
        return { success: true, space: FoundSpace };
    }catch(err){
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}