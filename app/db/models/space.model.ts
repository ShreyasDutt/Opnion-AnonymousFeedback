import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISpace extends Document {
  _id: Types.ObjectId;
  spacename: string;
  title: string;
  message: string;
  questions: string[];
  color: string;
  feedbacks?: Types.ObjectId[];
  views: Types.ObjectId[];
  createdby: Types.ObjectId;
  SpaceLogo: string;
  imageId: string;
  rounded: boolean;
  isDuplicated: boolean;
  isAcceptingFeedback: boolean;
}

const SpaceSchema = new Schema<ISpace>({
  spacename: {
    type: String,
    required: true,
  },
  isDuplicated:{
    type: Boolean,
    default: false,
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
  views: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'View',
  }],
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