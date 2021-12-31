import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty } from '@douyinfe/semi-ui';

// util
import { useCallback, useMemo, useEffect } from 'react';

import { withSessionSsr } from '@lib/session';
import ArtistProfile from '@components/ArtistProfile';
import ArtistTopTracks from '@components/ArtistTopTracks';
import ArtistAlbums from '@components/ArtistAlbums';
import { useRouter } from 'next/router';

const ArtistedDetail: NextPage = () => {
  const router = useRouter();

  const artistId = useMemo(() => router?.query?.artistId, [router?.query]);

  useEffect(() => {
    if (!router?.query?.artistId) router.back();
  }, [router]);

  return artistId ? (
    <UserLayout title="歌手详情">
      <div className="h-screen w-full overflow-y-auto">
        <Button onClick={() => router.back()}>返回</Button>
        {/* <ArtistProfile artistId={artistId as string} /> */}
        <h4>专辑</h4>
        <ArtistAlbums artistId={artistId as string} />

        <h4>热门歌曲</h4>
        <ArtistTopTracks artistId={artistId as string} />
      </div>
    </UserLayout>
  ) : (
    <Empty title="未检测到 artistId" />
  );
};

export default ArtistedDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const profile = req.session?.spotify?.profile;

    // @ts-ignore
    console.log(req.session.spotify);

    if (!profile)
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };

    // 不能 return 空
    return {
      props: {
        profile,
      },
    };
  },
);
