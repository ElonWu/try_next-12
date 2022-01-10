import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button } from '@douyinfe/semi-ui';

// util
import { useCallback } from 'react';

import { local } from '@utils/local_request';
import FollowArtist from '@components/FollowArtist';
import { SpotifyLoginGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import PlaylistOfMine from '@components/PlaylistOfMine';
import UserNav from '@components/UserNav';
import AlbumsNewlyReleased from '@components/AlbumsNewlyReleased';

const Login: NextPage = ({ profile }: any) => {
  const onLogin = useCallback(async () => {
    const res = await local.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

  return (
    <UserLayout title="用户登录">
      {profile ? (
        <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
          <UserNav profile={profile} />

          <AlbumsNewlyReleased />
          <FollowArtist />
          <PlaylistOfMine />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Button onClick={onLogin}>请授权登录</Button>
        </div>
      )}
    </UserLayout>
  );
};

export default Login;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyLoginGetServerSideProps;
