import { queryParams } from '@utils/format';

const SpotifyBase = `https://api.spotify.com/v1`;

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
