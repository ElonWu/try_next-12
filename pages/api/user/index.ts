import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@models/user';
import { getUsers } from '@services/user';

type UserRes = User[];

const handler = async (req: NextApiRequest, res: NextApiResponse<UserRes>) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export default handler;
