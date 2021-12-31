import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';

const ArtistAlbums = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<{ list: any[] }>(
    `/api/spotify/artist/albums?artistId=${artistId}`,
  );

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as any[]) : []),
    [data],
  );

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="flex flex-nowrap w-full overflow-auto space-x-4">
      {list.map(({ id, name, images, release_date, total_tracks }) => (
        <div
          key={id}
          className="p-4 bg-white rounded-md shadow-md grid  shrink-0"
          style={{ width: 280 }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-teal-600 shadow-md overflow-hidden">
            <img src={images?.[0]?.url} alt="Album" />
          </div>

          <h4>{name}</h4>
          <p>歌曲数目：{total_tracks}</p>
          <p>发行日期：{release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtistAlbums;
