'use server'

import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect"



import Space from "../db/models/space.model";
import User from "../db/models/user.model";


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
            newSpacename = spacename+(FoundSpace.length+1);
        }
        newSpacename = spacename;

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
        
        return { success: true, message: 'Space created' };
        
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}