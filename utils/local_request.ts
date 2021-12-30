import { Notification } from '@douyinfe/semi-ui';

import { Request } from './request';

export const local = new Request('/', {
  onSuccess: (data: any) => {
    return Promise.resolve(data);
  },
  onError: (err: any) => {
    const errMsg = err?.response?.statusText || '未知错误';

    Notification.error({
      content: errMsg,
      duration: 5,
    });
    return Promise.reject(errMsg);
  },
});
