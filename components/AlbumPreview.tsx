import React from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { Album } from '@type/spotify';

const AlbumPreview = ({ album, link }: { album: Album; link?: boolean }) => {
  const router = useRouter();

  if (!album) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="shrink-0 h-48 w-72 rounded-md overflow-hidden bg-no-repeat bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${album?.images?.[0]?.url})` }}
      onClick={() => link && router.push(`/spotify/album/${album?.id}`)}
    >
      <div className="h-full shadow-md p-4 flex flex-col items-start justify-between bg-gradient-to-br from-slate-500/60 to-slate-900/60 ">
        <h4 className="text-2xl font-bold text-white w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {album?.name}
        </h4>
        <p className="text-xs text-slate-200 ">
          发行日期：{album?.release_date}
        </p>
      </div>
    </div>
  );
};

export default AlbumPreview;
