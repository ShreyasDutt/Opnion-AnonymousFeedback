import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  clerkId:string;
  username: string;
  email: string;
  firstname: string;
  spaces: Types.ObjectId[];
  isAcceptingFeedback: boolean;
}

// Define the schema
const userSchema = new Schema<IUser>({
  clerkId:{
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  spaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    default: [],
  }],
  isAcceptingFeedback: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const User = (mongoose.models.User as mongoose.Model<IUser>) || 
             mongoose.model<IUser>('User', userSchema);
export default User;