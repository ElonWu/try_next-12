import { connectToDatabase } from '../lib/db';
import UserModel, { User } from '../models/user';

export const getUsers = async (filters?: any) => {
  await connectToDatabase('bi');
  return UserModel.find({}, null, { limit: 10 });
};

export const createUser = async (payload: User) => {
  await connectToDatabase('bi');

  const user: User = await UserModel.create(payload);

  return user;
};

export const findUser = async (payload: User) => {
  await connectToDatabase('bi');

  const user: User | null = await UserModel.findOne(payload).exec();

  return user;
};
