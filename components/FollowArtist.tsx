import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { Artist } from '@type/spotify';
import Image from 'next/image';

const FollowArtist = () => {
  const router = useRouter();

  const { data } = useApi<{ list: Artist[] }>('/api/spotify/artist/follow');

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as Artist[]) : []),
    [data],
  );

  if (!list.length) {
    return <Empty title="暂无数据" description="尝试关注" />;
  }

  return (
    <div className="flex flex-col items-stretch space-y-4">
      <h4>关注歌手</h4>
      <div className="flex flex-nowrap overflow-auto space-x-4 p-4">
        {list.map((artist) => {
          return (
            <div
              key={artist.id}
              className="shrink-0 flex p-4 items-end justify-start rounded-md shadow-md cursor-pointer bg-no-repeat bg-cover bg-center w-16 h-24"
              onClick={() => router.push(`/spotify/artist/${artist.id}`)}
              style={{
                backgroundImage: `url(${artist.images?.[0]?.url})`,
              }}
            >
              {/* <h2>{artist.name}</h2> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowArtist;
