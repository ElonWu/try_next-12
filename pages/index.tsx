import type { GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';

import { User } from '@models/user';
import UserLayout from '@layouts/user';
import { withSessionSsr } from '@lib/session';
import { Button, Notification } from '@douyinfe/semi-ui';
import { useCallback } from 'react';
import { local } from '@utils/local_request';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const onLogout = useCallback(async () => {
    await local.post('/api/user/logout');
    Notification.success({ content: '成功登出', duration: 5 });
    router.push('/login');
  }, [router]);

  return (
    <UserLayout title="首页">
      <div className="flex flex-col space-y-4 p-4  m-auto items-center">
        {/* 静态文件 basePath 为 public */}
        <Image src="/img/vercel.svg" alt="logo" width={141} height={32} />
        <h3>欢迎来到首页, {user?.name}</h3>

        <div className="text-blue-500">
          <Link href="/user">查看用户列表</Link>
        </div>
        <Button onClick={onLogout}>登出</Button>
      </div>
    </UserLayout>
  );
};

export default Home;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = req.session.user;

    if (!user)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };

    return { props: { user } };
  },
);
