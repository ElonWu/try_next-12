import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@models/user';
import { findUser } from '@services/user';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === 'POST') {
    const user: User | null = await findUser(req.body);

    if (user) {
      res.status(200).json(user);
    } else {
      res.statusMessage = 'wrong user';
      res.status(401).end();
    }
  }
};

export default handler;
