import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty } from '@douyinfe/semi-ui';

// util
import {
  useCallback,
  useMemo,
  useEffect,
  useState,
  MouseEventHandler,
  useRef,
} from 'react';

import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { queryParams } from '@utils/format';
import { local } from '@utils/local_request';
import { PlayState, Track } from '@type/spotify';
import TrackPlay from '@components/TrackPlay';
import { IconPause, IconPlay } from '@douyinfe/semi-icons';

interface Player {
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
  togglePlay: () => Promise<any>;
  previousTrack: () => Promise<any>;
  nextTrack: () => Promise<any>;
  seek: (milliseconds: number) => Promise<any>;
  addListener: (event: string, cb: any) => void;
  removeListener: (event: string, cb: any) => void;
}

const TrackDetail: NextPage<{ access_token?: string }> = ({ access_token }) => {
  const router = useRouter();

  const trackId = useMemo(() => router?.query?.trackId, [router?.query]);

  const playerRef = useRef<Player | null>();

  const [track, setTrack] = useState<Track | null>();
  const [playState, setPlayState] = useState<PlayState>();
  const [position, setPosition] = useState<number>(0);

  const onReady = useCallback(async ({ device_id }: { device_id: string }) => {
    await local.put('/api/spotify/play' + queryParams({ device_id }), {
      trackId,
    });
  }, []);

  const onStateChange = useCallback((state) => {
    if (!state) return;

    const {
      position,
      duration,
      track_window: { current_track },
    } = state;

    setPlayState(state);

    // 直接转换为百分比位置
    setPosition((position / duration) * 100);

    setTrack(current_track);
  }, []);

  const onResetPosition: MouseEventHandler<HTMLDivElement> = useCallback(
    async (e: any) => {
      const player = playerRef.current;

      if (!player) return;

      const { width, x } = e.target.getBoundingClientRect();

      // 控制范围
      const percent = Math.max(0, Math.min(100, (e.clientX - x) / width));
      await player.seek(percent * (playState?.duration || 0));

      return;
    },
    [playState],
  );

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = async () => {
      // @ts-ignore
      const player: Player = new Spotify.Player({
        name: 'ElonWU Web Player',
        getOAuthToken: (cb: any) => cb(access_token),
      });

      playerRef.current = player;
      // Ready
      player.addListener('ready', onReady);
      // StateChange
      player.addListener('player_state_changed', onStateChange);

      await player.connect();
    };

    return () => {
      const player = playerRef.current;
      if (!player) return;

      // Ready
      player.removeListener('ready', onReady);
      // StateChange
      player.removeListener('player_state_changed', onStateChange);

      player.disconnect();
    };
  }, []);

  useInsertScript('https://sdk.scdn.co/spotify-player.js');

  const timerRef = useRef<NodeJS.Timer | null>();

  useEffect(() => {
    if (playState?.paused !== false) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setInterval(() => {
      // 直接转换为百分比位置
      setPosition((prev) => prev + (1000 / playState.duration) * 100); // 1000ms / duration 转换为百分比
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playState]);

  const title = useMemo(
    () => (track?.name ? `歌曲详情 - ${track.name}` : '歌曲详情'),
    [track],
  );

  return (
    <UserLayout title={title}>
      <div className="h-screen w-full overflow-y-auto">
        {!playerRef.current ? (
          <Empty title="连接播放器" />
        ) : !track ? (
          <Empty title="未获得详情" />
        ) : (
          <div className="flex flex-col sapce-y-4">
            <TrackPlay track={track} />

            <div
              className="relative h-4 w-full rounded-md"
              style={{
                backgroundImage: `linear-gradient(to right, green ${position}%, #999999 ${position}%)`,
              }}
              onClick={onResetPosition}
            ></div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4">
          <Button onClick={() => playerRef.current?.previousTrack()}>
            上一首
          </Button>
          <Button onClick={() => playerRef.current?.togglePlay()}>
            {playState?.paused ? <IconPlay /> : <IconPause />}
          </Button>
          <Button onClick={() => playerRef.current?.nextTrack()}>下一首</Button>
        </div>
      </div>
    </UserLayout>
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
      // @ts-ignore
      window.onSpotifyWebPlaybackSDKReady();
      return;
    }

    // 加载脚本后，执行回调
    const script = document.createElement('script');
    script.src = url;

    document.head.appendChild(script);
  }, []);
};
