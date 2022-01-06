import { queryParams } from '@utils/format';
import { Request } from '@utils/request';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取歌曲
 */
export const getSpotifyTrack = (
  access_token: string,
  params: { id: string },
) => {
  return fetch(`${SpotifyBase}/tracks/${params.id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};
