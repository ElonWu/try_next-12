import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import { Album } from '@type/spotify';
import AlbumPreview from './AlbumPreview';

const ArtistAlbums = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<{ list: Album[] }>(
    `/api/spotify/artist/albums?artistId=${artistId}`,
  );

  const list: Album[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as Album[]) : []),
    [data],
  );

  if (!data?.list?.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">专辑</h4>
      <div className="flex flex-nowrap overflow-auto space-x-4 pr-4">
        {list.map((album) => (
          <AlbumPreview album={album} key={album?.id} link />
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbums;
