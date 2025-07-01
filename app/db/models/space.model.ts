import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISpace extends Document {
  spacename: string;
  title: string;
  message: string;
  questions: string[];
  color: string;
  feedbacks?: Types.ObjectId[];
  views: number;
}

const SpaceSchema = new Schema<ISpace>({
  spacename: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedbacks',
  }],
  questions: [{
    type: String,
    default: true,
  }],
  color: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Space = (mongoose.models.Space as mongoose.Model<ISpace>) || 
             mongoose.model<ISpace>('Space', SpaceSchema);
export default Space;