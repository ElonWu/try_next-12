import { withSessionRoute } from '@lib/session';
import { getSpotifyFollowArtist } from '@services/spotify/profile';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const access_token = req.session?.spotify?.access_token;

  const response = await getSpotifyFollowArtist(access_token, {
    type: 'artist',
  });

  const data = await response.json();

  if (!data || data?.error) {
    res
      .status(data?.error?.status || 400)
      .json({ message: data?.error.message });
    return;
  }

  res.status(200).json({ list: data?.artists?.items || [] });
};

export default withSessionRoute(handler);
