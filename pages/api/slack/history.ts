import { withSessionRoute } from '@lib/session';
import { getConversationHistory } from '@services/slack/message';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const result = await getConversationHistory({
      channel: 'C02U98HD8P4',
    });

    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ message: error?.toString?.() || '未知错误' });
  }
};

export default withSessionRoute(handler);
