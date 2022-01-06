import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty, Tag } from '@douyinfe/semi-ui';

import { Artist } from '@type/spotify';
import { useRouter } from 'next/router';

const ArtistPreview = ({
  artist,
  link,
}: {
  artist: Artist;
  link?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      className="shrink-0 bg-white rounded-md shadow-md p-4 flex items-center justify-start space-x-4 cursor-pointer"
      onClick={() => link && router.push(`/spotify/artist/${artist?.id}`)}
    >
      <img
        src={artist?.images?.[0]?.url}
        alt={artist?.name}
        className="w-16 h-16 rounded border shadow-md"
      />
      <div className="h-full flex-1 flex flex-col justify-between min-w-0">
        <div className="flex justify-between">
          <h4 className="font-bold text-lg text-green-500">{artist?.name}</h4>
          {/* <p>{artist?.followers}</p> */}
        </div>
        <div className="w-full flex flex-nowrap space-x-4 overflow-x-auto">
          {artist?.genres?.map((genre) => (
            <p
              key={genre}
              className="text-sm text-green-600 whitespace-nowrap p-1 bg-green-50 rounded-md"
            >
              {genre}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPreview;
