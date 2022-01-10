import React, { useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import TrackPreview from './TrackPreview';

import { List, Track } from '@type/spotify';

const ArtistTopTracks = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<Track[]>(
    `/api/spotify/artist/topTracks?artistId=${artistId}`,
  );

  const list: Track[] = useMemo(
    () => (Array.isArray(data) ? (data as Track[]) : []),
    [data],
  );

  const [activeId, setActiveId] = useState<string | null>();

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">热门歌曲</h4>
      <div
        className="grid gap-4"
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
    </div>
  );
};

export default ArtistTopTracks;
