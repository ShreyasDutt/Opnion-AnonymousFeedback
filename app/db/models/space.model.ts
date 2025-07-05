import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISpace extends Document {
  spacename: string;
  title: string;
  message: string;
  questions: string[];
  color: string;
  feedbacks?: Types.ObjectId[];
  views: number;
  createdby: Types.ObjectId;
  SpaceLogo: string;
  imageId: string;
  rounded: boolean;
  isAcceptingFeedback: boolean;
}

const SpaceSchema = new Schema<ISpace>({
  spacename: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
  }],
  SpaceLogo:{
    type: String,
    required: true,
  },
  imageId:{
    type: String,
    required: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  questions: [{
    type: String,
    default: [],
  }],
  color: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
    isAcceptingFeedback: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Space = (mongoose.models.Space as mongoose.Model<ISpace>) || 
             mongoose.model<ISpace>('Space', SpaceSchema);
export default Space;