import { queryParams } from '@utils/format';

const SpotifyBase = `https://api.spotify.com/v1`;

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CALLBACK_URI } =
  process.env;

export const getSpotifyToken = (code: string) => {
  const Authorization = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')}`;

  // @ts-ignore
  const body = new URLSearchParams({
    code,
    redirect_uri: SPOTIFY_CALLBACK_URI,
    grant_type: 'authorization_code',
  });

  return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization,
    },
  });
};

export const getSpotifyProfile = (access_token: string) => {
  return fetch(`${SpotifyBase}/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取关注的歌手
 */
export const getSpotifyFollowArtist = (
  access_token: string,
  params: { type: 'artist'; limit?: number },
) => {
  return fetch(`${SpotifyBase}/me/following` + queryParams(params), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};
