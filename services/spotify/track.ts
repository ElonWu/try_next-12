import { Track } from '@type/spotify';
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
export const getSpotifyTrack = async (
  spotifySession: any,
  params: { id: string },
): Promise<Track> => {
  const response = await fetch(`${SpotifyBase}/tracks/${params.id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifySession?.access_token}`,
    },
  });

  const track: Track = await response.json();
  return track;
};

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<>
 *
 * @description 播放歌曲
 */
export const playSpotifyUri = async (
  spotifySession: any,
  params: { device_id: string; uris: string[] },
) => {
  return fetch(
    `${SpotifyBase}/me/player/play` +
      queryParams({ device_id: params.device_id }),
    {
      method: 'PUT',
      body: JSON.stringify({ uris: params.uris }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifySession?.access_token}`,
      },
    },
  );
};
