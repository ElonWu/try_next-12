import type { NextApiRequest, NextApiResponse } from 'next';

import { getFeishuAuth } from '@services/feishu/auth';
import { withSessionRoute } from '@lib/session';
import { differenceInMilliseconds, parseISO } from 'date-fns';

const {
  FEISHU_APP_ID,
  FEISHU_APP_SECRET,
  FEISHU_CALLBACK_URL,
  FEISHU_NONCESTR,
} = process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  let needRefresh = false;

  let auth: any = req.session?.feishu;

  if (auth?.last_update) {
    // 距离最近一次获取的时间
    const lastUpdatedPast = differenceInMilliseconds(
      new Date(),
      parseISO(auth.last_update),
    );
    // 即将过期或已过期
    if (lastUpdatedPast >= auth.expire_in * 0.9) needRefresh = true;
  }
  // 未获取
  else {
    needRefresh = true;
  }

  if (needRefresh) {
    auth = await getFeishuAuth({
      app_id: FEISHU_APP_ID as string,
      app_secret: FEISHU_APP_SECRET as string,
      url: FEISHU_CALLBACK_URL as string,
      nonceStr: FEISHU_NONCESTR as string,
    });

    req.session.feishu = auth;

    await req.session.save();
  }

  if (needRefresh) console.log('refreshed');

  console.log(auth);

  res.status(200).json(Object.assign({}, auth, { refresed: needRefresh }));
};

export default withSessionRoute(handler);
