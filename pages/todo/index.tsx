import type { NextPage } from 'next';

// component
import UserLayout from '@layouts/user';

// util
import { useCallback, useMemo } from 'react';
import TodoList from '@components/TodoList';
import TodoForm from '@components/TodoForm';
import useApi from '@hooks/useApi';
import { local } from '@utils/local_request';
import { Notification } from '@douyinfe/semi-ui';
import { TodoWithCreator } from '@models/todo';

const UserCreate: NextPage = () => {
  const { data, mutate: reload } = useApi<TodoWithCreator>('/api/todo');

  const list = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const onCreate = useCallback(
    async (payload) => {
      await local.post('/api/todo/create', payload);
      Notification.success({ content: '创建成功', duration: 5 });
      await reload();
    },
    [reload],
  );

  return (
    <UserLayout title="Todo 列表">
      <div className="rounded bg-slate-300 inline-flex flex-col items-center justify-center p-4">
        <h4>Todo 列表</h4>
        <TodoList list={list} />

        <TodoForm onChange={onCreate} />
      </div>
    </UserLayout>
  );
};

export default UserCreate;
