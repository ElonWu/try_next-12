import { queryParams } from '@utils/format';
import { Playlist } from '@type/spotify';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Playlist[]>
 *
 * @description 获取我的播放列表
 */
export const getMySpotifyPlaylist = async (
  spotifySession: any,
  params: { limit?: number; offset?: number },
): Promise<Playlist[]> => {
  const response = await fetch(
    `${SpotifyBase}/me/playlists` + queryParams(params),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifySession?.access_token}`,
      },
    },
  );

  const data = await response.json();

  if (data?.error) {
    return Promise.reject(data.error);
  }

  return Promise.resolve(data.items);
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Playlist[]>
 *
 * @description 获取我的播放列表
 */
export const getSpotifyPlaylistDetail = async (
  spotifySession: any,
  params: { id: string },
): Promise<Playlist> => {
  const response = await fetch(`${SpotifyBase}/playlists/${params.id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifySession?.access_token}`,
    },
  });

  const data = await response.json();

  if (data?.error) {
    return Promise.reject(data.error);
  }

  return Promise.resolve(data);
};
