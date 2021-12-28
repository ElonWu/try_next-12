import { connectToDatabase } from '../lib/db';
import UserModel, { User } from '../models/user';

export const getUsers = async (filters?: any) => {
  await connectToDatabase();
  return UserModel.find({}, null, { limit: 2 });
};
