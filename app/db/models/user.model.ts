import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  spaces?: Types.ObjectId;
  isAcceptingFeedback: boolean;
}

// Define the schema
const userSchema = new Schema<IUser>({
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
  name: {
    type: String,
    required: true,
  },
  spaces: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
  },
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