import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty } from '@douyinfe/semi-ui';

// util
import { useCallback, useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { queryParams } from '@utils/format';
import { local } from '@utils/local_request';
import { Track } from '@type/spotify';

interface Player {
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
  togglePlay: () => Promise<any>;
  previousTrack: () => Promise<any>;
  nextTrack: () => Promise<any>;
  addListener: (event: string, cb: any) => void;
}

const TrackDetail: NextPage<{ access_token?: string }> = ({ access_token }) => {
  const router = useRouter();

  const trackId = useMemo(() => router?.query?.trackId, [router?.query]);

  const [player, setPlayer] = useState<Player | null>();
  const [track, setTrack] = useState<Track | null>();

  const onReady = useCallback(
    async ({ device_id }: { device_id: string }) => {
      const track: Track | void = await local.put(
        '/api/spotify/play' + queryParams({ device_id }),
        {
          trackId,
        },
      );

      if (track) setTrack(track);
    },
    [trackId],
  );

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = async () => {
      // @ts-ignore
      const player: Player = new Spotify.Player({
        name: 'ElonWU Web Player',
        getOAuthToken: (cb: any) => cb(access_token),
      });

      // Ready
      player.addListener('ready', onReady);

      // // Not Ready
      // player.addListener(
      //   'not_ready',
      //   ({ device_id }: { device_id: string }) => {
      //     console.log('Device ID has gone offline', device_id);
      //   },
      // );

      // player.addListener(
      //   'initialization_error',
      //   ({ message }: { message: string }) => {
      //     console.error(message);
      //   },
      // );

      // player.addListener(
      //   'authentication_error',
      //   ({ message }: { message: string }) => {
      //     console.error(message);
      //   },
      // );

      // player.addListener(
      //   'account_error',
      //   ({ message }: { message: string }) => {
      //     console.error(message);
      //   },
      // );

      await player.connect();

      setPlayer(player);
    };
  }, []);

  useInsertScript('https://sdk.scdn.co/spotify-player.js');

  useEffect(() => {
    return () => {
      player?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!trackId) router.back();
  }, [trackId, router]);

  return trackId ? (
    <UserLayout title="歌曲详情">
      <div className="h-screen w-full overflow-y-auto">
        {!player ? (
          <Empty title="连接播放器" />
        ) : (
          <div>
            <h4>已连接</h4>

            <Button onClick={() => player?.togglePlay()}>播放</Button>
            <Button onClick={() => player?.previousTrack()}>上一首</Button>
            <Button onClick={() => player?.nextTrack()}>下一首</Button>

            {track ? <h4>{track.name}</h4> : <Empty title="未获得详情" />}
          </div>
        )}
      </div>
    </UserLayout>
  ) : (
    <Empty title="未检测到 trackId" />
  );
};

export default TrackDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;

const useInsertScript = (url: string) => {
  useEffect(() => {
    const existed =
      document.querySelectorAll(`script[src="${url}"]`).length > 0;

    // 已加载脚本，直接执行回调
    if (existed) {
      return;
    }

    // 加载脚本后，执行回调
    const script = document.createElement('script');
    script.src = url;

    document.head.appendChild(script);
  }, []);
};
