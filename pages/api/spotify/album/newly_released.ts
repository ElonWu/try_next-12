import { withSessionRoute } from '@lib/session';
import { getSpotifyReleasedAlbum } from '@services/spotify/album';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // @ts-ignore
  const albums = await getSpotifyReleasedAlbum(req.session?.spotify, {
    limit: 5,
  });

  try {
    res.status(200).json(albums);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
