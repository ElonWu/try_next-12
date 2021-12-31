import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useApi from '@hooks/useApi';
import { Empty, Icon } from '@douyinfe/semi-ui';
import { IconFlag, IconPause, IconPlay } from '@douyinfe/semi-icons';

const ArtistTopTracks = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<{ list: any[] }>(
    `/api/spotify/artist/topTracks?artistId=${artistId}`,
  );

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as any[]) : []),
    [data],
  );

  const [activeId, setActiveId] = useState();

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="grid gap-4 p-2"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))` }}
    >
      {list.map(({ id, name, popularity, preview_url, album }) => {
        const playing = activeId === id;

        const cls = playing ? 'animate-spin' : '';

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-md shadow-md flex items-center space-x-4"
          >
            <div
              className={`w-16 h-16 rounded-full border-2 border-purple-600 shadow-md overflow-hidden ${cls}`}
              style={{ animationDuration: '4s' }}
            >
              <img src={album?.images?.[0]?.url} alt="Album" />
            </div>

            <div className="flex-1 h-full grid justify-between">
              <h4 className="text-xl font-bold text-teal-400">{name}</h4>
              <span className="text-sm text-teal-300 flex items-center space-x-2">
                <IconFlag size="large" /> {popularity}
              </span>
            </div>

            <Player
              previewUrl={preview_url}
              playing={playing}
              onPlay={(playing: boolean) => setActiveId(playing ? id : null)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ArtistTopTracks;

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
    <div onClick={() => onPlay(!playing)}>
      <audio
        ref={ref as LegacyRef<HTMLAudioElement>}
        autoPlay={false}
        src={previewUrl}
      />

      <span className="p-2 border rounded-full grid items-center justify-center">
        {playing ? <IconPause /> : <IconPlay />}
      </span>
    </div>
  );
};
