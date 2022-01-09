import React from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@type/spotify';
const TrackPlay = ({ track }: { track: Track }) => {
  if (!track) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md flex items-center space-x-4">
      <img
        src={track?.album?.images?.[0]?.url}
        alt="Album"
        className="w-full h-auto rounded-sm"
      />
    </div>
  );
};

export default TrackPlay;
