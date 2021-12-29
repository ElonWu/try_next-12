import React from 'react';
import { Empty } from '@douyinfe/semi-ui';

import type { FC } from 'react';
import type { TodoWithCreator } from '@models/todo';

const TODOList: FC<{ list: TodoWithCreator[] }> = ({ list }) => {
  if (Array.isArray(list) && list.length) {
    return (
      <div className="flex flex-wrap pt-4 pl-4">
        {list.map((todo) => {
          const { _id, title, creator } = todo;
          return (
            <div
              key={_id}
              className="mr-4 mb-4 inline-flex space-x-4 bg-white shadow-md p-4 items-center rounded"
            >
              <h2 className="text-blue-500">
                {title} - {creator.name}
              </h2>
            </div>
          );
        })}
      </div>
    );
  }

  return <Empty title="暂无数据" description="尝试新建TODO" />;
};

export default TODOList;
