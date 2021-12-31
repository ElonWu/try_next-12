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
    <div className="flex flex-nowrap w-full overflow-auto space-x-4 p-2">
      {list.map(({ id, name, images, release_date, total_tracks }) => (
        <div
          key={id}
          className="h-40 w-72 shrink-0 rounded-md overflow-hidden bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${images?.[0]?.url})` }}
        >
          <div className="h-full shadow-md p-4 grid items-center bg-gradient-to-br from-slate-500/60 to-slate-900/60 ">
            <h4 className="text-2xl font-bold text-white">{name}</h4>
            <p className="text-xs text-slate-200 ">发行日期：{release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistAlbums;
