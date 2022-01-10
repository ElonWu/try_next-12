import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { Artist } from '@type/spotify';
import Image from 'next/image';

const FollowArtist = () => {
  const router = useRouter();

  const { data } = useApi<{ list: Artist[] }>('/api/spotify/artist/follow');

  const list: Artist[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as Artist[]) : []),
    [data],
  );

  if (!list.length) {
    return <Empty title="暂无数据" description="尝试关注" />;
  }

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">关注歌手</h4>
      <div className="flex flex-nowrap overflow-auto space-x-4 pr-4">
        {list.map((artist) => {
          return (
            <div
              key={artist.id}
              onClick={() => router.push(`/spotify/artist/${artist.id}`)}
              className="shrink-0 flex flex-col items-center justify-start cursor-pointer"
            >
              <div
                className="rounded-md shadow-md  bg-no-repeat bg-cover bg-center w-16 h-24"
                style={{
                  backgroundImage: `url(${artist.images?.[0]?.url})`,
                }}
              />
              <h2 className="text-center text-sm text-gray-500 w-16 whitespace-nowrap overflow-hidden text-ellipsis">
                {artist.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowArtist;
