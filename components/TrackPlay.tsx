import React from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@type/spotify';
const TrackPlay = ({ track }: { track: Track }) => {
  if (!track) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="flex-shrink-0 p-4 bg-white rounded-md shadow-md flex items-center space-x-4">
      <div className="shadow-md relative">
        <img
          src={track?.album?.images?.[0]?.url}
          alt="Album"
          className="w-full h-auto rounded-sm"
        />

        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col p-4"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #00000000, #000000)',
          }}
        >
          <h4 className="text-xl font-bold text-teal-400">{track?.name}</h4>
          <h4 className="text-xl font-bold text-teal-400">
            {track?.artists[0]?.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TrackPlay;
