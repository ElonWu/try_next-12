import React, { useRef, useEffect, useMemo } from 'react';
import type { LegacyRef } from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@type/spotify';
import { IconFlag, IconPause, IconPlay } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';

const TrackPreview = ({
  track,
  playing,
  onPlay,
}: {
  track: Track;
  playing: boolean;
  onPlay: (activeId: string | null) => void;
}) => {
  const router = useRouter();

  const { hasImages, hasFlag } = useMemo(() => {
    return {
      hasImages: track?.album?.images,
      hasFlag: track?.popularity,
    };
  }, [track]);

  if (!track) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="flex-shrink-0 p-4 bg-white rounded-md shadow-md flex items-center space-x-4"
      onClick={() => router.push(`/spotify/track/${track?.id}`)}
    >
      {hasImages && (
        <div
          className={`w-16 h-16 rounded-full border-2 border-purple-600 shadow-md overflow-hidden ${
            playing ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '4s' }}
        >
          <img src={track?.album?.images?.[0]?.url} alt="Album" />
        </div>
      )}

      <div className="flex-1 h-full grid justify-between">
        <h4 className="text-xl font-bold text-teal-400">{track?.name}</h4>
        {hasFlag && (
          <span className="text-sm text-teal-300 flex items-center space-x-2">
            <IconFlag size="large" /> {track?.popularity}
          </span>
        )}
      </div>

      <Player
        previewUrl={track?.preview_url}
        playing={playing}
        onPlay={(playing: boolean) => onPlay(playing ? track?.id : null)}
      />
    </div>
  );
};

export default TrackPreview;

const Player = ({
  previewUrl,
  playing,
  onPlay,
}: {
  previewUrl: string;
  playing: boolean;
  onPlay: (playing: boolean) => void;
}) => {
  const ref = useRef<HTMLAudioElement>();

  useEffect(() => {
    playing ? ref.current?.play() : ref.current?.pause();
  }, [playing]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onPlay(!playing);
      }}
    >
      <audio
        ref={ref as LegacyRef<HTMLAudioElement>}
        autoPlay={false}
        src={playing ? previewUrl : ''} // 只在播放时加载资源
        onEnded={() => onPlay(false)}
      />

      <span className="p-2 border rounded-full grid items-center justify-center">
        {playing ? <IconPause /> : <IconPlay />}
      </span>
    </div>
  );
};