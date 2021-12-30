import { Form, Button } from '@douyinfe/semi-ui';
import useWebSocket from '@hooks/useSocket';
import UserLayout from '@layouts/user';
import { local } from '@utils/request';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>('no message');

  const { isOpen, send, close } = useWebSocket<string>({
    url: '/api/ws',
    onMessage: setMessage,
  });

  const onSend = async (message: string) => {
    await local.post('/api/ws/chat', { message });
  };

  return (
    <UserLayout title="测试信息推送">
      <div>{isOpen ? <h4>最新消息:「{message}」</h4> : <p>连接中...</p>}</div>

      <div>
        <Form onSubmit={(values) => onSend(values?.message)}>
          <Form.Input field="message" label="发送" style={{ width: '100%' }} />
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </div>
    </UserLayout>
  );
};

export default Home;
