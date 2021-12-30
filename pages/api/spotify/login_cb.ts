import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { getSpotifyProfile } from '@services/spotify/profile';
import { queryParams } from '@utils/format';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
  process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { code, state } = req.query;

  if (!code) {
    res.status(401).json({ message: 'unauthorized' });
    return;
  }

  const Authorization = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')}`;

  // @ts-ignore
  const body = new URLSearchParams({
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  // const body = `code=${encodeURIComponent(
  //   code as string,
  // )}&redirect_uri=${encodeURIComponent(
  //   SPOTIFY_REDIRECT_URI as string,
  // )}&grant_type=authorization_code`;

  // const body = JSON.stringify({
  //   code,
  //   redirect_uri: SPOTIFY_REDIRECT_URI,
  //   grant_type: 'authorization_code',
  // });

  console.log({
    Authorization,
    code,
    SPOTIFY_REDIRECT_URI,
    body,
  });

  const response: any = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    body,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization,
    },
  });

  const data = await response.json();

  console.log('spotify response', data);
  res.status(200).json(data);
  // const profile = await getSpotifyProfile(response?.access_token);

  // // @ts-ignore
  // req.session.spotify = Object.assign({}, req.session.spotify, {
  //   state,
  //   access_token: response?.access_token,
  //   refresh_token: response?.refresh_token,
  //   profile,
  // });

  // req.session.save();

  res.end();
};

export default withSessionRoute(handler);
