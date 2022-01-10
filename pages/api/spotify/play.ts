import { withSessionRoute } from '@lib/session';
import { getSpotifyPlaylistDetail } from '@services/spotify/playlist';
import { playSpotifyUri } from '@services/spotify/track';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAlbum } from '../../../services/spotify/album';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { device_id } = req.query;
  const { uri } = req.body;

  let uris: string[] = [];

  if (uri.startsWith('spotify:track')) {
    uris = [uri];
  }
  // 专辑 uris
  else if (uri.startsWith('spotify:album')) {
    const albumId = uri.split(':')[2];
    // @ts-ignore
    const album = await getSpotifyAlbum(req.session?.spotify, { id: albumId });
    uris = album.tracks.items.map((track) => track.uri);
  }
  // 播放列表 uris
  else if (uri.startsWith('spotify:playlist')) {
    const playlistId = uri.split(':')[2];
    // @ts-ignore
    const playlist = await getSpotifyPlaylistDetail(req.session?.spotify, {
      id: playlistId,
    });
    uris = playlist.tracks.items.map(
      (playlistTrack) => playlistTrack.track.uri,
    );
  }

  try {
    const result = await playSpotifyUri(
      // @ts-ignore
      req.session?.spotify,
      {
        device_id: device_id as string,
        uris,
      },
    );
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
