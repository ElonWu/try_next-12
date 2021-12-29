import type { NextPage } from 'next';

// component
import UserLayout from '@layouts/user';
import { Notification } from '@douyinfe/semi-ui';
import UserForm from '@components/UserForm';

// util
import { useCallback } from 'react';
import { local } from '@utils/request';
import { useRouter } from 'next/router';

const UserCreate: NextPage = () => {
  const router = useRouter();

  const onCreate = useCallback(
    async (values) => {
      await local.post('/api/user/create', values);
      Notification.info({ content: '成功创建', duration: 5 });
      router.back();
    },
    [router],
  );

  return (
    <UserLayout title="创建用户">
      <div className="rounded bg-slate-300 inline-flex flex-col items-center justify-center">
        <h4>创建用户</h4>
        <UserForm onChange={onCreate} />
      </div>
    </UserLayout>
  );
};

export default UserCreate;
