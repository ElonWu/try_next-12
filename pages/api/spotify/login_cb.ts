import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { getSpotifyProfile } from '@services/spotify/profile';
import { queryParams } from '@utils/format';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CALLBACK_URI } =
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
    redirect_uri: SPOTIFY_CALLBACK_URI,
    grant_type: 'authorization_code',
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

  // @ts-ignore
  req.session.spotify = Object.assign({}, req.session.spotify, {
    state,
    expires_in: data?.expires_in,
    access_token: data?.access_token,
    refresh_token: data?.refresh_token,
  });
  // 保存鉴权
  await req.session.save();

  const profileResponse = await getSpotifyProfile(data?.access_token);

  const profile = await profileResponse.json();

  // 保存个人信息
  if (profile) {
    // @ts-ignore
    req.session.spotify = Object.assign({}, req.session.spotify, {
      profile,
    });

    await req.session.save();
  }

  res.redirect('/spotify');
};

export default withSessionRoute(handler);
