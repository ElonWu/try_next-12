import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Empty } from '@douyinfe/semi-ui';

// util
import { useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useApi from '@hooks/useApi';
import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import TrackPreview from '@components/TrackPreview';
import { Track } from '@type/spotify';
import AlbumPreview from '@components/AlbumPreview';

const ArtistedDetail: NextPage = () => {
  const router = useRouter();

  const albumId = useMemo(() => router?.query?.albumId, [router?.query]);

  useEffect(() => {
    if (!albumId) router.back();
  }, [albumId, router]);

  const { data } = useApi<any>(`/api/spotify/album/${albumId}`);

  const [activeId, setActiveId] = useState<string | null>();

  if (!data) {
    return <Empty title="暂无数据" />;
  }

  return (
    <UserLayout title="专辑详情">
      <div className="h-screen w-full overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <AlbumPreview album={data} />

          <div className="flex flex-col space-y-4">
            {(data?.tracks?.items || []).map((track: Track) => (
              <TrackPreview
                key={track?.id}
                track={track}
                playing={activeId === track.id}
                onPlay={(activeId) => setActiveId(activeId)}
              />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ArtistedDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
