import { withSessionRoute } from '@lib/session';
import { playSpotifyTrack } from '@services/spotify/track';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { device_id } = req.query;
  const { uri } = req.body;

  try {
    await playSpotifyTrack(
      // @ts-ignore
      req.session?.spotify,
      {
        device_id: device_id as string,
        uris: [uri],
      },
    );
    res.status(200).end();
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
