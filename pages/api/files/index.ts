// import { bucket } from 'firebase/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // const files = await bucket.getFiles({ delimiter: '/imgs' });

  // res.status(200).json(files);
  res.status(200).json('todo');
};

export default handler;
