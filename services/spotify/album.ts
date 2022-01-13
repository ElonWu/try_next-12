import { Album, List } from '@type/spotify';
import { queryParams } from '@utils/format';
import { IronSession, IronSessionData } from 'iron-session';
import { spotifyDelete, spotifyGet, spotifyPut } from './base';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise<FollowArtists>
 *
 * @description 获取歌手的专辑
 */
export const getSpotifyArtistAlbums = (
  session: IronSession,
  params: { id: string },
): Promise<Album[]> => spotifyGet(session, `/artists/${params.id}/albums`);

/**
 * @description 获取专辑详情
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise<Album>
 *
 */
export const getSpotifyAlbum = async (
  session: IronSession,
  params: { id: string },
): Promise<Album> => spotifyGet(session, `/albums/${params.id}`);

/**
 * @description 获取推荐的新专辑
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise<{ albums: List<Album> }>
 *
 */
export const getSpotifyReleasedAlbum = async (
  session: IronSession,
  params: { limit?: number; offset?: number },
): Promise<{ albums: List<Album> }> => {
  return spotifyGet<{ albums: List<Album> }>(
    session,
    `/browse/new-releases`,
    params,
  );
};

/**
 * @description 收藏专辑
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise
 *
 */
export const saveSpotifyAlbums = (
  session: IronSession,
  params: { ids: string },
) => spotifyPut(session, `/me/albums`, params);

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise
 *
 * @description 取消收藏专辑
 */
export const unsaveSpotifyAlbums = (
  session: IronSession,
  params: { ids: string },
) => spotifyDelete(session, `/me/albums`, params);

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise
 *
 * @description 检查收藏专辑
 */
export const checkSpotifySavedAlbums = (
  session: IronSession,
  params: { ids: string },
) => spotifyGet(session, `/me/albums/contains`, params);
