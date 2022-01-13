import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button } from '@douyinfe/semi-ui';

// util
import { useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useApi from '@hooks/useApi';
import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import TrackPreview from '@components/TrackPreview';
import { Playlist, Track } from '@type/spotify';
import { PlaylistTrack } from '../../../type/spotify';
import Loading, {
  ArtistSkeleton,
  TrackListSkeleton,
} from '@components/base/loading';

const PlaylistDetail: NextPage = () => {
  const router = useRouter();

  const playlistId = useMemo(() => router?.query?.playlistId, [router?.query]);

  useEffect(() => {
    if (!playlistId) router.back();
  }, [playlistId, router]);

  const { data, loading, hasError } = useApi<Playlist>(
    `/api/spotify/playlist/${playlistId}`,
  );

  const title = useMemo(() => `播放列表-${data?.name || '-'}`, []);

  const [activeId, setActiveId] = useState<string | null>();

  return (
    <UserLayout title={title}>
      <div className="flex flex-col space-y-4 items-stretch py-4">
        <Loading
          loading={loading}
          error={hasError}
          empty={!data}
          skeleton={<ArtistSkeleton />}
        >
          {data && (
            <div className="w-full shrink-0 cursor-pointer relative">
              <img
                src={data.images?.[0]?.url}
                alt={data.name}
                className="w-full"
              />
              <div
                className="absolute inset-0 p-4 flex flex-col space-y-4 items-stretch justify-end"
                style={{
                  background: `linear-gradient(to bottom, #00000000, #000000)`,
                }}
              >
                <div className="flex items-center justify-between px-4">
                  <h4 className="font-bold text-lg text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.name}
                  </h4>
                  <Button
                    onClick={() => router.push(`/spotify/player/${data.uri}`)}
                  >
                    Play All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Loading>

        <Loading
          loading={loading}
          error={hasError}
          empty={!data?.tracks?.items?.length}
          skeleton={<TrackListSkeleton />}
        >
          <div className="grid gap-4 px-4">
            {(data?.tracks?.items || []).map((item: PlaylistTrack) => (
              <TrackPreview
                key={item?.track?.id}
                track={item?.track}
                playing={activeId === item?.track.id}
                onPlay={(activeId) => setActiveId(activeId)}
              />
            ))}
          </div>
        </Loading>
      </div>
    </UserLayout>
  );
};

export default PlaylistDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
