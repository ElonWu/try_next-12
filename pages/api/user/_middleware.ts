import { NextApiRequest, NextApiResponse } from 'next';

// 局部 API 中间件
export const middleware = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
};
