import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty, Tag } from '@douyinfe/semi-ui';

import { Artist } from '@type/spotify';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
      className="w-full shrink-0 cursor-pointer relative"
      onClick={() => link && router.push(`/spotify/artist/${artist?.id}`)}
    >
      <img
        src={artist?.images?.[0]?.url || ''}
        alt={artist?.name}
        className="w-full"
      />
      <div
        className="absolute inset-0 p-4 flex flex-col space-y-2 items-stretch justify-end"
        style={{
          background: `linear-gradient(to bottom, #00000000, #000000)`,
        }}
      >
        <h4 className="font-bold text-lg text-green-500 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {artist?.name}
        </h4>

        <div className="w-full flex space-x-2 overflow-x-auto">
          {artist?.genres?.map((genre) => (
            <p
              key={genre}
              className="text-xs text-green-600 whitespace-nowrap px-1 bg-green-50 rounded-sm"
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
