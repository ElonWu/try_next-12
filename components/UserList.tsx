import React, { FC } from 'react';
import { Button, Empty } from '@douyinfe/semi-ui';
import { User } from '@models/user';
import { useRouter } from 'next/router';

const UserList: FC<{ list: (User & { _id: string })[] }> = ({ list }) => {
  const router = useRouter();

  if (Array.isArray(list) && list.length) {
    return (
      <div className="flex flex-wrap pt-4 pl-4">
        {list.map((user) => {
          const { _id, name, email } = user;
          return (
            <div
              key={_id}
              className="mr-4 mb-4 inline-flex space-x-4 bg-white shadow-md p-4 items-center rounded"
            >
              <h2>{name}</h2>
              <Button onClick={() => router.push(`/user/${_id}`)}>
                {email}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  return <Empty title="暂无数据" description="尝试新建用户" />;
};

export default UserList;
