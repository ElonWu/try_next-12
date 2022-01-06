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

const ArtistedDetail: NextPage = () => {
  const router = useRouter();

  const artistId = useMemo(() => router?.query?.artistId, [router?.query]);

  useEffect(() => {
    if (!artistId) router.back();
  }, [artistId, router]);

  return artistId ? (
    <UserLayout title="歌手详情">
      <div className="h-screen w-full overflow-y-auto">
        <ArtistProfile artistId={artistId as string} />

        <h4 className="p-4 mt-2">专辑</h4>
        <ArtistAlbums artistId={artistId as string} />

        <h4 className="p-4 mt-2">热门歌曲</h4>
        <ArtistTopTracks artistId={artistId as string} />
      </div>
    </UserLayout>
  ) : (
    <Empty title="未检测到 artistId" />
  );
};

export default ArtistedDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
