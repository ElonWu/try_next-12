import { withSessionRoute } from '@lib/session';
import { getSpotifyArtistTopTracks } from '@services/spotify/artist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // @ts-ignore
  const access_token = req.session?.spotify?.access_token;
  // @ts-ignore
  const country = req.session?.spotify?.profile?.country as string;

  const id = req.query.artistId as string;

  const response = await getSpotifyArtistTopTracks(access_token, {
    id,
    market: country,
  });

  const data = await response.json();

  if (!data || data?.error) {
    res
      .status(data?.error?.status || 400)
      .json({ message: data?.error.message });
    return;
  }

  res.status(200).json({ list: data.tracks || [] });
};

export default withSessionRoute(handler);
