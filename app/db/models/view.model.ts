import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IView extends Document {
  space: Types.ObjectId;
  viewedAt: Date;
}

const ViewSchema = new Schema<IView>({
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

const View = mongoose.models.View || mongoose.model<IView>('View', ViewSchema);
export default View;
