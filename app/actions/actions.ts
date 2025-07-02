'use server'

import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect"



import mongoose, { Schema, Document, Types } from 'mongoose';
import Space from "../db/models/space.model";
import User from "../db/models/user.model";


export interface SpaceInterface {
    spacename: string;
    title: string;
    message: string;
    questions: string[];
    color: string;
}

export const CreateSpace = async({spacename, title, message, questions, color}:SpaceInterface) =>{
const { userId } = await auth();
console.log('userId:', userId);
const FoundUser = await User.findOne({ clerkId: userId });
if (!FoundUser) {
   console.log('User not found');
}
try{
    await dbConnect();
    const CreatedSpace = await Space.create({
        spacename,
        title,
        message,
        questions,
        color,
        createdby: FoundUser?._id,
    })
    FoundUser?.spaces?.push(CreatedSpace._id as Types.ObjectId);
    await FoundUser?.save();
    return {success: true, message: 'Space created'};
    
    }catch(err){
        console.log(err)
    }

}