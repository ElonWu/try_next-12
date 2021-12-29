import type { NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Avatar, Button, Empty, Notification } from '@douyinfe/semi-ui';
import UserForm from '@components/UserForm';

// util
import useApi from '@hooks/useApi';
import { useCallback, useMemo, useState } from 'react';

import { User } from '@models/user';
import UserList from '@components/UserList';
import { local } from '@utils/request';

const UserHome: NextPage = () => {
  const { data, mutate: reload } = useApi('/api/user');

  const [userLogin, setUserLogin] = useState<User>();

  const users = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const onCreate = useCallback(
    async (values) => {
      await local.post('/api/user/create', values);
      Notification.info({ content: '成功创建', duration: 5 });
      await reload();
    },
    [reload],
  );

  const onLogin = useCallback(async (values) => {
    const user = await local.post<User>('/api/user/login', values);
    Notification.info({ content: '成功登录', duration: 5 });

    if (user) setUserLogin(user);
  }, []);

  return (
    <UserLayout title="创建用户">
      <div className="flex flex-col space-y-4">
        <h4>当前登录</h4>
        {userLogin ? (
          <h2 className="inline-block p-4 bg-slate-300 text-black">
            {userLogin?.name}
          </h2>
        ) : (
          <Empty
            title="未登录"
            description="尝试登录"
            className="w-24 h-24 rounded bg-slate-300 inline-flex items-center justify-center"
          />
        )}

        <h4>用户列表</h4>
        <UserList list={users} />

        <div className="flex items-start justify-start space-x-4">
          <div className="rounded bg-slate-300 inline-flex flex-col items-center justify-center">
            <h4>创建用户</h4>
            <UserForm onChange={onCreate} />
          </div>
          <div className="rounded bg-slate-300 inline-flex flex-col items-center justify-center">
            <h4>用户登录</h4>
            <UserForm onChange={onLogin} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHome;
