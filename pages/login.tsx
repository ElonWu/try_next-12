import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Notification } from '@douyinfe/semi-ui';
import UserForm from '@components/UserForm';

// util
import { useCallback } from 'react';

import { User } from '@models/user';
import { local } from '@utils/request';
import { useRouter } from 'next/router';
import { withSessionSsr } from '@lib/session';

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

  return (
    <UserLayout title="用户登录">
      <div className="flex items-center justify-center h-screen">
        <UserForm onChange={onLogin} />
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
