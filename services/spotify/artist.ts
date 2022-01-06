import { queryParams } from '@utils/format';
import { Artist } from '@type/spotify';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Artist[]>
 *
 * @description 获取歌手信息
 */
export const getSpotifyArtistProfile = (
  access_token: string,
  params: { id: string },
): Promise<Response> => {
  return fetch(`${SpotifyBase}/artists/${params.id}`, {
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
 * @description 获取歌手最受欢迎的歌曲
 */
export const getSpotifyArtistTopTracks = (
  access_token: string,
  params: { id: string; market: string },
) => {
  return fetch(
    `${SpotifyBase}/artists/${params.id}/top-tracks` +
      queryParams({ market: params.market }),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取歌手的专辑
 */
export const getSpotifyArtistAlbums = (
  access_token: string,
  params: { id: string },
) => {
  return fetch(`${SpotifyBase}/artists/${params.id}/albums`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};
