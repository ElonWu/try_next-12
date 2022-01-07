import { withSessionRoute } from '@lib/session';
import { searchSpotify } from '@services/spotify/search';
import { getSpotifyTrack, playSpotifyTrack } from '@services/spotify/track';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { device_id } = req.query;
  const { trackId } = req.body;

  const track = await getSpotifyTrack(
    // @ts-ignore
    req.session?.spotify,
    { id: trackId },
  );

  try {
    await playSpotifyTrack(
      // @ts-ignore
      req.session?.spotify,
      {
        device_id: device_id as string,
        uris: [track?.uri],
      },
    );
  } catch (error: any) {
    console.log(error);

    // res
    //   .status(error?.status || 400)
    //   .json({ message: error.message || '未知错误' });
  } finally {
    res.status(200).json(track);
  }
};

export default withSessionRoute(handler);
