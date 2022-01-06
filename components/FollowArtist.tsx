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
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))` }}
    >
      {list.map((artist) => {
        return (
          <div
            key={artist.id}
            className="flex bg-white shadow-md p-4 items-center justify-between rounded-md cursor-pointer"
            onClick={() => router.push(`/spotify/artist/${artist.id}`)}
          >
            <h2>{artist.name}</h2>

            <div className="w-16 h-16 rounded-full border-4 border-teal-600 shadow-md overflow-hidden">
              <img src={artist.images?.[0]?.url as string} alt="Artist" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowArtist;
