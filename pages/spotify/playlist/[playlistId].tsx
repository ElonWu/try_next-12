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
import { Playlist, Track } from '@type/spotify';
import { PlaylistTrack } from '../../../type/spotify';

const PlaylistDetail: NextPage = () => {
  const router = useRouter();

  const playlistId = useMemo(() => router?.query?.playlistId, [router?.query]);

  useEffect(() => {
    if (!playlistId) router.back();
  }, [playlistId, router]);

  const { data } = useApi<Playlist>(`/api/spotify/playlist/${playlistId}`);

  const title = useMemo(() => `播放列表-${data?.name || '-'}`, []);

  const [activeId, setActiveId] = useState<string | null>();

  if (!data) {
    return <Empty title="暂无数据" />;
  }

  return (
    <UserLayout title={title}>
      <div className="h-screen w-full overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b">
            <h4 onClick={() => router.push(`/spotify/playlist/${data.id}`)}>
              {data.name}
            </h4>
            <Button onClick={() => router.push(`/spotify/player/${data.uri}`)}>
              Play
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            {(data?.tracks?.items || []).map((item: PlaylistTrack) => (
              <TrackPreview
                key={item?.track?.id}
                track={item?.track}
                playing={activeId === item?.track.id}
                onPlay={(activeId) => setActiveId(activeId)}
              />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default PlaylistDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
