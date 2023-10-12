import mongoose, { Schema, Document } from "mongoose";
import {TAlertModel} from '@/types/types'

const ObjectId = Schema.ObjectId;

const AlertSchema: Schema = new Schema({
  userId: ObjectId,
  projectId: {
    type: ObjectId,
    default: null
  },
  structureId: {
    type: ObjectId,
    default: null
  },
  message: String,
  subjectId: String,
  subjectType: String,
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date
  },
});

AlertSchema.set('toObject', { virtuals: true });
AlertSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Alert || mongoose.model < TAlertModel & Document > ("Alert", AlertSchema);