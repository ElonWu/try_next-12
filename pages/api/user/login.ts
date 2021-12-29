import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@models/user';
import { findUser } from '@services/user';
import { withSessionRoute } from '@lib/session';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === 'POST') {
    const user: User | null = await findUser(req.body);

    if (user) {
      // @ts-ignore
      req.session.user = user;
      await req.session.save();

      res.status(200).json(user);
    } else {
      res.statusMessage = 'wrong user';
      res.status(401).end();
    }
  }
};

export default withSessionRoute(handler);
