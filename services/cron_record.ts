import { connectToDatabase } from '@lib/db';
import CronRecordModel from '@models/cron_record';

export const createRecord = async () => {
  await connectToDatabase('bi');

  await CronRecordModel.create({ recordTime: new Date() });
};
