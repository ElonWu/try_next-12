import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty } from '@douyinfe/semi-ui';

// util
import { useCallback, useMemo, useEffect } from 'react';

import ArtistProfile from '@components/ArtistProfile';
import ArtistTopTracks from '@components/ArtistTopTracks';
import ArtistAlbums from '@components/ArtistAlbums';
import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';

const ArtistDetail: NextPage = () => {
  const router = useRouter();

  const artistId = useMemo(() => router?.query?.artistId, [router?.query]);

  useEffect(() => {
    if (!artistId) router.back();
  }, [artistId, router]);

  return (
    <UserLayout title="歌手详情">
      {artistId ? (
        <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
          <ArtistProfile artistId={artistId as string} />
          <ArtistAlbums artistId={artistId as string} />
          <ArtistTopTracks artistId={artistId as string} />
        </div>
      ) : (
        <Empty title="未检测到 artistId" />
      )}
    </UserLayout>
  );
};

export default ArtistDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
