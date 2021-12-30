import { Button } from '@douyinfe/semi-ui';
import UserLayout from '@layouts/user';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const onShare = async () => {
    try {
      navigator.share({
        title: 'WebShare API Demo',
        url: 'http://localhost:3000/share',
        text: '我正在尝试 Share Api',
      });
      console.log('Data was shared successfully');
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <UserLayout title="测试分享">
      <div>
        <Button onClick={onShare}>分享</Button>
      </div>
    </UserLayout>
  );
};

export default Home;
