import { withSessionRoute } from '@lib/session';
import { getSpotifyPlaylistDetail } from '@services/spotify/playlist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const id = req.query.playlistId as string;

  // @ts-ignore
  const playlist = await getSpotifyPlaylistDetail(req.session?.spotify, { id });

  try {
    res.status(200).json(playlist);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
