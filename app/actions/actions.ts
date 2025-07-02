'use server'

import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect"



import Space from "../db/models/space.model";
import User from "../db/models/user.model";
import { revalidatePath } from "next/cache";


export interface SpaceInterface {
    spacename: string;
    title: string;
    message: string;
    questions: string[];
    color: string;
}

export const CreateSpace = async({spacename, title, message, questions, color}:SpaceInterface) => {
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
        await Space.findByIdAndDelete(spaceId);
    
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
