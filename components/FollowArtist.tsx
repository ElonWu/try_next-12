import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';

const FollowArtist = () => {
  const router = useRouter();

  const { data } = useApi<{ list: any[] }>('/api/spotify/artist/follow');

  const list: any[] = useMemo(
    () => (Array.isArray(data?.list) ? (data?.list as any[]) : []),
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
            key={artist?.id}
            className="flex bg-white shadow-md p-4 items-center justify-between rounded-md"
            onClick={() => router.push(`/spotify/artist/${artist?.id}`)}
          >
            <h2>{artist?.name}</h2>

            <div className="w-16 h-16 rounded-full border-4 border-teal-600 shadow-md overflow-hidden">
              <img src={artist?.images?.[0]?.url} alt="Artist" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowArtist;
