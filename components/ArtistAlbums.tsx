import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
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
    <div className="flex flex-nowrap w-full overflow-auto space-x-4 p-2">
      {list.map((album) => (
        <AlbumPreview album={album} key={album?.id} link />
      ))}
    </div>
  );
};

export default ArtistAlbums;
