import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { Avatar, IconButton, Notification } from '@douyinfe/semi-ui';
import { local } from '@utils/local_request';
import { IconSearch, IconSignal } from '@douyinfe/semi-icons';

const UserNav = ({ profile }: any) => {
  const router = useRouter();

  // const onLogout = useCallback(async () => {
  //   await local.post('/api/spotify/logout');
  //   Notification.success({ content: '已登出', duration: 5 });
  //   router.reload();
  // }, [router]);

  return (
    <div className="p-4 rounde shadow-md flex items-center justify-between">
      <Avatar size="small">{profile?.display_name?.[0] || ''}</Avatar>

      <div className="flex items-center justify-end">
        {/* <IconButton size='large' onClick={onLogout} icon={<IconSignal size="large" />} /> */}

        <IconButton
          size="large"
          onClick={() => router.push('/spotify/search')}
          icon={<IconSearch size="large" />}
        />
      </div>
    </div>
  );
};

export default UserNav;
