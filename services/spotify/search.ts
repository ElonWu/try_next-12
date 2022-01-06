import {
  Album,
  Artist,
  Episode,
  Playlist,
  Show,
  Track,
  SpotifySerchType,
  SearchResult,
  SpotifySerchResultKey,
  SearchResultReponse,
} from '@type/spotify';
import { queryParams } from '@utils/format';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取歌曲
 */
export const searchSpotify = async (
  spotifySession: any,
  params: {
    q?: string;
    type?: SpotifySerchType[];
    limit?: number;
    offset?: number;
  },
): Promise<SearchResultReponse> => {
  const response = await fetch(`${SpotifyBase}/search` + queryParams(params), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifySession?.access_token}`,
    },
  });

  const search: SearchResult = await response.json();

  let result: SearchResultReponse = {
    album: {
      type: 'album',
      list: search?.albums?.items || [],
    },
    artist: {
      type: 'artist',
      list: search?.artists?.items || [],
    },
    playlist: {
      type: 'playlist',
      list: search?.playlists?.items || [],
    },
    track: {
      type: 'track',
      list: search?.tracks?.items || [],
    },
    // TODO 之后再开发
    // show: {
    //   type: 'show',
    //   list: search?.shows?.items || [],
    // },
    // episode: {
    //   type: 'episode',
    //   list: search?.episodes?.items || [],
    // },
  };

  return result;
};
