import { Album, List, SpotifyError } from '@type/spotify';
import { queryParams } from '@utils/format';

const SpotifyBase = `https://api.spotify.com/v1`;

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

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取专辑详情
 */
export const getSpotifyAlbum = async (
  spotifySession: any,
  params: { id: string },
): Promise<Album> => {
  const response = await fetch(`${SpotifyBase}/albums/${params.id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifySession?.access_token}`,
    },
  });

  const data: Album & SpotifyError = await response.json();

  if (data?.error) {
    return Promise.reject(data.error);
  }

  return Promise.resolve(data);
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取推荐的新专辑
 */
export const getSpotifyReleasedAlbum = async (
  spotifySession: any,
  params: { limit?: number; offset?: number },
): Promise<Album[]> => {
  const response = await fetch(
    `${SpotifyBase}/browse/new-releases` + queryParams(params),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifySession?.access_token}`,
      },
    },
  );

  const data = await response.json();

  return data.albums.items;
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 收藏专辑
 */
export const saveSpotifyAlbums = (
  access_token: string,
  params: { ids: string },
) => {
  return fetch(`${SpotifyBase}/me/albums` + queryParams({ ids: params.ids }), {
    method: 'PUT',
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
 * @description 取消收藏专辑
 */
export const unsaveSpotifyAlbums = (
  access_token: string,
  params: { ids: string },
) => {
  return fetch(`${SpotifyBase}/me/albums` + queryParams({ ids: params.ids }), {
    method: 'DELETE',
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
 * @description 检查收藏专辑
 */
export const checkSpotifySavedAlbums = (
  access_token: string,
  params: { ids: string },
) => {
  return fetch(
    `${SpotifyBase}/me/albums/contains` + queryParams({ ids: params.ids }),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
};
