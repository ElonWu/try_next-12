import { withSessionRoute } from '@lib/session';
import { getSpotifyArtistAlbums } from '@services/spotify/artist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // @ts-ignore
  const data = await getSpotifyArtistAlbums(req.session?.spotify, {
    artistId: req.query.artistId as string,
  });

  if (!data || data?.error) {
    res
      .status(data?.error?.status || 400)
      .json({ message: data?.error.message });
    return;
  }

  res.status(200).json(data);
};

export default withSessionRoute(handler);
