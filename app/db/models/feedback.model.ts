import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFeedback extends Document {
  message: string;
}

const FeedbackSchema = new Schema<IFeedback>({
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Feedback = (mongoose.models.Feedback as mongoose.Model<IFeedback>) || 
             mongoose.model<IFeedback>('Feedback', FeedbackSchema);
export default Feedback;