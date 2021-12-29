import type { NextPage } from 'next';

// component
import UserLayout from '@layouts/user';

// util
import { useMemo } from 'react';
import UserList from '@components/UserList';
import useApi from '@hooks/useApi';
import Link from 'next/link';

const UserCreate: NextPage = () => {
  const { data } = useApi('/api/user');

  const list = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <UserLayout title="用户列表">
      <div className="rounded bg-slate-300 inline-flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between p-4">
          <h4>用户列表</h4>

          <div className="text-blue-500">
            <Link href="/user/create">新建用户</Link>
          </div>
        </div>
        <UserList list={list} />
      </div>
    </UserLayout>
  );
};

export default UserCreate;
