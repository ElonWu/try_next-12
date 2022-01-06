import { withSessionRoute } from '@lib/session';
import { searchSpotify } from '@services/spotify/search';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const result = await searchSpotify(
    // @ts-ignore
    req.session?.spotify,
    Object.assign({ limit: 5 }, req.query),
  );

  try {
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
