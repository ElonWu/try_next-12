import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button } from '@douyinfe/semi-ui';

// util
import { useCallback } from 'react';

import { local } from '@utils/local_request';
import { withSessionSsr } from '@lib/session';
import Router, { useRouter } from 'next/router';
import FollowArtist from '@components/FollowArtist';

const Login: NextPage = ({ profile }: any) => {
  const onLogin = useCallback(async () => {
    const res = await local.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

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
            </div>

            <FollowArtist />
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Login;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const profile = req.session?.spotify?.profile;

    // @ts-ignore
    console.log(req.session.spotify);

    if (!profile)
      return {
        props: {},
      };

    // 不能 return 空
    return {
      props: {
        profile,
      },
    };
  },
);
