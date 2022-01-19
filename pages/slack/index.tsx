import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Input, Notification } from '@douyinfe/semi-ui';

// util
import { local } from '@utils/local_request';
import useApi from '@hooks/useApi';

const Slack: NextPage = () => {
  const { data: history, loading, hasError } = useApi('/api/slack/history');

  const [text, setText] = useState<string>();

  const onSend = useCallback(async () => {
    if (text) {
      await local.post('/api/slack/post_message', { text });
      Notification.success({ content: '已发送' });
    }
  }, [text]);

  console.log({
    history,
  });

  return (
    <UserLayout title="Slack">
      <div className="flex flex-col items-stretch space-y-4">
        <Input
          placeholder="请输入"
          value={text}
          onChange={(txt) => setText(txt)}
        />
        <Button onClick={onSend}>发送</Button>
      </div>
    </UserLayout>
  );
};

export default Slack;
