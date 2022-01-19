import { withSessionRoute } from '@lib/session';
import { postMessage } from '@services/slack/message';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const result = await postMessage({
      channel: 'C02U98HD8P4',
      // text: 'Hello from vercel',
      text: req.body.text,
    });

    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ message: error?.toString?.() || '未知错误' });
  }
};

export default withSessionRoute(handler);
