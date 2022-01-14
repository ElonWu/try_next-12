import React from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@type/spotify';
import { useRouter } from 'next/router';
const TrackPlay = ({ track }: { track: Track }) => {
  const router = useRouter();

  if (!track) return <Empty title="暂无数据" />;

  return (
    <div
      className="w-full p-4 bg-white rounded-md shadow-md flex items-center space-x-4 cursor-pointer"
      onClick={() => {
        const albumId = (track?.album?.uri || '').split(':')[2];
        if (albumId) router.replace(`/spotify/album/${albumId}`);
      }}
    >
      <img
        src={track?.album?.images?.[0]?.url}
        alt="Album"
        className="w-full h-auto rounded-sm"
      />
    </div>
  );
};

export default TrackPlay;
