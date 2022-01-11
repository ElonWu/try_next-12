import type { NextApiRequest, NextApiResponse } from 'next';

import { firestore } from '@lib/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  let result: any[] = [];

  const snapshot = await firestore.collection('cities').get();

  snapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  res.status(200).json({ data: result, message: 'success' });
};

export default handler;
