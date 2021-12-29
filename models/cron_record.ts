import mongoose, { Schema, models, Date } from 'mongoose';
import type { Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface CronRecord {
  recordTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
const cronRecordSchema = new Schema<CronRecord>({
  recordTime: Date,
});

const CronRecordModel: Model<CronRecord> =
  models.cronRecord ||
  mongoose.model<CronRecord>('cronRecord', cronRecordSchema);

export default CronRecordModel;
