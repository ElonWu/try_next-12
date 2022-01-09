import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button } from '@douyinfe/semi-ui';

// util
import { useCallback } from 'react';

import { local } from '@utils/local_request';
import FollowArtist from '@components/FollowArtist';
import { Notification } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { SpotifyLoginGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import PlaylistOfMine from '@components/PlaylistOfMine';

const Login: NextPage = ({ profile }: any) => {
  const router = useRouter();

  const onLogin = useCallback(async () => {
    const res = await local.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

  const onLogout = useCallback(async () => {
    await local.post('/api/spotify/logout');
    Notification.success({ content: '已登出', duration: 5 });
    router.reload();
  }, [router]);

  return (
    <UserLayout title="用户登录">
      <div className="h-screen w-full flex flex-col space-y-4">
        {!profile && <Button onClick={onLogin}>请授权登录</Button>}

        {profile && (
          <div className="flex flex-col space-y-4">
            <div className="p-4 rounde shadow-md">
              <h4>{profile?.display_name}</h4>
              <p>{profile?.email}</p>
              <p>账号地区：{profile?.country}</p>

              <Button onClick={onLogout}>登出</Button>
              <Button onClick={() => router.push('/spotify/search')}>
                搜索
              </Button>
            </div>

            <FollowArtist />

            <PlaylistOfMine />
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Login;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyLoginGetServerSideProps;
