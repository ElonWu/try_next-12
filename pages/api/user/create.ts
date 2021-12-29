import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@models/user';
import { createUser } from '@services/user';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === 'POST') {
    const user: User = await createUser(req.body);
    res.status(200).json(user);
  }
};

export default handler;
