import React, { useRef, useEffect, useMemo } from 'react';
import type { LegacyRef } from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@type/spotify';
import { IconPause, IconPlay } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import { durationFormat } from '@utils/format';

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
      className="flex-shrink-0 p-2 bg-white rounded-md shadow-md flex items-center space-x-4"
      onClick={() => router.push(`/spotify/player/${track?.uri}`)}
    >
      {hasImages && (
        <div
          className={`w-12 h-12 rounded-full border border-purple-600 shadow-md overflow-hidden ${
            playing ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '4s' }}
        >
          <img src={track?.album?.images?.[0]?.url} alt="Album" />
        </div>
      )}

      <div className="flex-1 h-full grid gap-2 items-center">
        <h4 className="text-md font-bold text-teal-400 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {track?.name}{' '}
          <span className="text-sm font-normal">
            {durationFormat(track.duration_ms)}
          </span>
        </h4>
        <p className="text-gray-400 text-sm">
          {track.artists.map((artist) => artist.name).join(' . ')}
        </p>
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
        {playing ? <IconPause size="small" /> : <IconPlay size="small" />}
      </span>
    </div>
  );
};
