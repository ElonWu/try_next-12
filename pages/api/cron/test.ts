import type { NextApiRequest, NextApiResponse } from 'next';
import { createRecord } from '@services/cron_record';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createRecord();
    res.status(200).send({ message: 'success' });
  }
};

export default handler;
