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
import { IconPause, IconPlay } from '@douyinfe/semi-icons';

const ArtistTopTracks = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<{ list: any[] }>(
    `/api/spotify/artist/topTracks?artistId=${artistId}`,
  );

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as any[]) : []),
    [data],
  );

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))` }}
    >
      {list.map(({ id, name, popularity, preview_url, album }) => (
        <div
          key={id}
          className="p-4 bg-white rounded-md shadow-md flex items-center justify-between"
        >
          <div className="w-16 h-16 rounded-full border-4 border-teal-600 shadow-md overflow-hidden">
            <img src={album?.images?.[0]?.url} alt="Album" />
          </div>

          <div className="flex-1">
            <h4>{name}</h4>
            <p>popularity: {popularity}</p>
          </div>

          <Player previewUrl={preview_url} />
        </div>
      ))}
    </div>
  );
};

export default ArtistTopTracks;

const Player = ({ previewUrl }: { previewUrl: string }) => {
  const ref = useRef<HTMLAudioElement>();

  const [playing, setPlaying] = useState<boolean>(false);

  const onToggle = useCallback(
    () => (playing ? ref.current?.pause() : ref.current?.play()),
    [playing],
  );

  useEffect(() => {
    return () => {
      if (playing) onToggle();
    };
  }, []);

  return (
    <div onClick={onToggle}>
      <audio
        ref={ref as LegacyRef<HTMLAudioElement>}
        autoPlay={false}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        src={previewUrl}
      />

      {playing ? <IconPause /> : <IconPlay />}
    </div>
  );
};
