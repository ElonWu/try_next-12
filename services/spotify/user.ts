import { User, SpotifyError, Artist } from '@type/spotify';
import { queryParams } from '@utils/format';

import { differenceInMilliseconds, parseISO } from 'date-fns';

const SpotifyBase = `https://api.spotify.com/v1`;

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CALLBACK_URI } =
  process.env;

/**
 *
 * @param code
 * @returns Promise
 *
 * @description 获取 token
 */
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

/**
 *
 * @param code
 * @returns Promise
 *
 * @description 获取 token
 */
export const refreshSpotifyToken = async (spotifySession: any) => {
  const Authorization = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')}`;

  const { last_update, expires_in, refresh_token, access_token } =
    spotifySession;

  const lastUpdatedPast = differenceInMilliseconds(
    new Date(),
    parseISO(last_update),
  );

  // 即将或已过期
  if (lastUpdatedPast >= expires_in * 0.9) {
    // @ts-ignore
    const body = new URLSearchParams({
      refresh_token,
      grant_type: 'refresh_token',
    });

    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization,
      },
    });

    const data = await response.json();

    return data?.access_token;
  }

  return access_token;
};

/**
 *
 * @param access_token
 * @returns Promise<User>
 *
 * @description 获取关注的歌手
 */
export const getSpotifyProfile = async (
  access_token: string,
): Promise<User | SpotifyError> => {
  const response = await fetch(`${SpotifyBase}/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data: User = await response.json();

  return data;
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Artists[]>
 *
 * @description 获取关注的歌手
 */
export const getSpotifyFollowArtist = async (
  spotifySession: any,
  params: { type: 'artist'; limit?: number },
): Promise<Artist[]> => {
  const response = await fetch(
    `${SpotifyBase}/me/following` + queryParams(params),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifySession?.access_token}`,
      },
    },
  );

  const data: { artists: { items: Artist[] } } & SpotifyError =
    await response.json();

  if (data?.error) {
    return Promise.reject(data.error);
  }

  return Promise.resolve(data.artists.items);
};
