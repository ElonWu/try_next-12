import { withSessionRoute } from '@lib/session';
import { getSpotifyArtistProfile } from '@services/spotify/artist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // @ts-ignore
  const access_token = req.session?.spotify?.access_token;

  const id = req.query.artistId as string;

  const response = await getSpotifyArtistProfile(access_token, {
    id,
  });

  const data = await response.json();

  if (!data || data?.error) {
    res
      .status(data?.error?.status || 400)
      .json({ message: data?.error.message });
    return;
  }

  res.status(200).json(
    Object.assign({}, data, {
      followers: data.followers.total,
    }),
  );
};

export default withSessionRoute(handler);
