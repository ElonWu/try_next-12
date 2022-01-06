import React, { useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import TrackPreview from './TrackPreview';

const ArtistTopTracks = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<{ list: any[] }>(
    `/api/spotify/artist/topTracks?artistId=${artistId}`,
  );

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as any[]) : []),
    [data],
  );

  const [activeId, setActiveId] = useState<string | null>();

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="grid gap-4 p-2"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))` }}
    >
      {list.map((track) => (
        <TrackPreview
          key={track.id}
          track={track}
          playing={activeId === track.id}
          onPlay={(activeId) => setActiveId(activeId)}
        />
      ))}
    </div>
  );
};

export default ArtistTopTracks;
