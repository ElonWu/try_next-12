import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Notification } from '@douyinfe/semi-ui';
import UserForm from '@components/UserForm';

// util
import { useCallback, useEffect } from 'react';

import { local } from '@utils/local_request';
import { useRouter } from 'next/router';
import { withSessionSsr } from '@lib/session';

import { User } from '@models/user';

const Login: NextPage = () => {
  const router = useRouter();

  const onLogin = useCallback(
    async (values) => {
      await local.post<User>('/api/user/login', values);
      Notification.success({ content: '成功登录', duration: 5 });
      router.replace('/');
    },
    [router],
  );

  const onTest = async () => {
    const list = await local.post('/api/firebase/test');

    console.log(list);
  };

  return (
    <UserLayout title="用户登录">
      <div className="flex items-center justify-center h-screen">
        {/* <UserForm onChange={onLogin} /> */}

        <Button onClick={onTest}>Test</Button>
      </div>
    </UserLayout>
  );
};

export default Login;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = req.session.user;

    // 已经登录
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }

    // 不能 return 空
    return { props: {} };
  },
);
