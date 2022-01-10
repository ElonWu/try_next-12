import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty } from '@douyinfe/semi-ui';

// util
import { useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useApi from '@hooks/useApi';
import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import TrackPreview from '@components/TrackPreview';
import { Album, Track } from '@type/spotify';
import AlbumPreview from '@components/AlbumPreview';

const ArtistedDetail: NextPage = () => {
  const router = useRouter();

  const albumId = useMemo(() => router?.query?.albumId, [router?.query]);

  useEffect(() => {
    if (!albumId) router.back();
  }, [albumId, router]);

  const { data } = useApi<Album>(`/api/spotify/album/${albumId}`);

  const [activeId, setActiveId] = useState<string | null>();

  const title = useMemo(() => `专辑详情-${data?.name || '-'}`, [data]);

  if (!data) {
    return <Empty title="暂无数据" />;
  }

  return (
    <UserLayout title={title}>
      <div className="flex flex-col items-stretch space-y-4">
        <div className="flex justify-center px-4 pt-4">
          <AlbumPreview album={data} />
        </div>

        <div className="flex flex-col space-y-4 items-stretch pb-4">
          <div className="flex items-center justify-between px-4">
            <h4 className="font-bold text-lg text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">
              专辑歌曲
            </h4>
            <Button onClick={() => router.push(`/spotify/player/${data.uri}`)}>
              Play All
            </Button>
          </div>

          <div className="grid gap-4 px-4">
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
