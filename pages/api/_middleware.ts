import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../middlewares/cors';

// API 中间件
export const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  // await cors(req, res);
};
