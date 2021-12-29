import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@models/user';
import { withSessionRoute } from '@lib/session';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === 'POST') {
    // @ts-ignore
    if (req.session.user) {
      await req.session.destroy();
      res.status(200).redirect('/login');
    } else {
      res.statusMessage = 'logout failed';
      res.status(401).end();
    }
  }
};

export default withSessionRoute(handler);
