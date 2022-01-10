import type { GetServerSidePropsContext, NextPage } from 'next';
import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction, MouseEventHandler } from 'react';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty, IconButton } from '@douyinfe/semi-ui';

// util
import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { queryParams } from '@utils/format';
import { local } from '@utils/local_request';
import { PlayState, Track } from '@type/spotify';
import TrackPlay from '@components/TrackPlay';
import {
  IconDoubleChevronLeft,
  IconDoubleChevronRight,
  IconPause,
  IconPlay,
} from '@douyinfe/semi-icons';

interface Player {
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
  togglePlay: () => Promise<any>;
  resume: () => Promise<any>;
  pause: () => Promise<any>;
  previousTrack: () => Promise<any>;
  nextTrack: () => Promise<any>;
  seek: (milliseconds: number) => Promise<any>;
  addListener: (event: string, cb: any) => void;
  removeListener: (event: string, cb: any) => void;
}

const TrackDetail: NextPage<{ access_token?: string }> = ({ access_token }) => {
  const router = useRouter();

  const uri = useMemo(() => router?.query?.uri, [router?.query]);

  const playerRef = useRef<Player | null>();

  const [track, setTrack] = useState<Track | null>();
  const [playState, setPlayState] = useState<PlayState>();
  const [position, setPosition] = useState<number>(0);

  const onReady = useCallback(async ({ device_id }: { device_id: string }) => {
    console.log('4. on ready');
    await local.put('/api/spotify/play' + queryParams({ device_id }), {
      uri,
    });
  }, []);

  const onStateChange = useCallback((state) => {
    console.log('4. on state change');
    console.log({ state });
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

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = async () => {
      // @ts-ignore
      const player: Player = new Spotify.Player({
        name: 'ElonWu Web Player',
        getOAuthToken: (cb: any) => cb(access_token),
      });

      console.log('3. init player', player);

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

  const title = useMemo(() => `播放 - ${track?.name || '-'}`, [track]);

  return (
    <UserLayout title={title}>
      <div className="h-screen w-full overflow-y-auto">
        {!playerRef.current ? (
          <Empty title="连接播放器" />
        ) : !track ? (
          <Empty title="未获得详情" />
        ) : (
          <div className="flex flex-col items-stretch h-full">
            <div className="flex-1 flex items-center justify-center">
              <TrackPlay track={track} />
            </div>

            <div className=" flex px-4 items-center justify-between">
              <h4 className="text-md font-bold text-gray-600">{track?.name}</h4>
              <h4 className="text-sm font-normal text-gray-400">
                {track?.artists[0]?.name}
              </h4>
            </div>

            <PlayerController
              player={playerRef.current}
              playState={playState}
              position={position}
              setPosition={setPosition}
            />
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default TrackDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;

const useInsertScript = (url: string) => {
  useEffect(() => {
    console.log('1. insert');
    const existed =
      document.querySelectorAll(`script[src="${url}"]`).length > 0;

    // 已加载脚本，直接执行回调
    if (existed) {
      console.log('2. exsit');
      // @ts-ignore
      window.onSpotifyWebPlaybackSDKReady();
      return;
    }

    // 加载脚本后，执行回调
    const script = document.createElement('script');
    script.src = url;

    console.log('2. append');
    document.body.appendChild(script);
  }, []);
};

const PlayerController = ({
  player,
  playState,
  position,
  setPosition,
}: {
  player: Player;
  position: number;
  playState?: PlayState;
  setPosition: Dispatch<SetStateAction<number>>;
}) => {
  const onResetPosition: MouseEventHandler<HTMLDivElement> = useCallback(
    async (e: any) => {
      if (!player) return;

      const { width, x } = e.target.getBoundingClientRect();

      // 控制范围
      const percent = Math.max(0, Math.min(100, (e.clientX - x) / width));
      await player.seek(percent * (playState?.duration || 0));
    },
    [player, playState],
  );

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

  return (
    <div className="controller p-4 flex flex-col items-stretch justify-start space-y-4">
      <div
        className="relative h-4 rounded-md"
        style={{
          backgroundImage: `linear-gradient(to right, green ${position}%, #999999 ${position}%)`,
        }}
        onClick={onResetPosition}
      />

      <div className="flex items-center justify-center space-x-4">
        <IconButton
          icon={<IconDoubleChevronLeft size="extra-large" />}
          onClick={() => player?.previousTrack()}
        />

        {playState?.paused ? (
          <IconButton
            icon={
              <IconPlay
                size="extra-large"
                onClick={() => player?.togglePlay()}
              />
            }
          />
        ) : (
          <IconButton
            icon={
              <IconPause size="extra-large" onClick={() => player?.pause()} />
            }
          />
        )}

        <IconButton
          icon={<IconDoubleChevronRight size="extra-large" />}
          onClick={() => player?.nextTrack()}
        />
      </div>
    </div>
  );
};
