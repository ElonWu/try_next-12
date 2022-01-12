import { withSessionRoute } from '@lib/session';
import { getSpotifyAlbum } from '@services/spotify/album';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const id = req.query.albumId as string;
    // @ts-ignore
    const album = await getSpotifyAlbum(req.session?.spotify, { id });

    res.status(200).json(album);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
