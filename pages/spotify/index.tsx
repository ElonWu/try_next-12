import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button } from '@douyinfe/semi-ui';

// util
import { useCallback } from 'react';

import { local } from '@utils/local_request';
import { withSessionSsr } from '@lib/session';
import Router, { useRouter } from 'next/router';

const Login: NextPage = ({ profile }: any) => {
  const router = useRouter();

  const onLogin = useCallback(async () => {
    const res = await local.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.open(res.uri, '__blank');
  }, []);

  return (
    <UserLayout title="用户登录">
      <div className="flex items-center justify-center h-screen">
        {profile ? '已登录' : '未登录'}

        {!profile && <Button onClick={onLogin}>登录</Button>}
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
