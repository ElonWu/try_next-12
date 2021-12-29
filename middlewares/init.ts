import { NextApiRequest, NextApiResponse } from 'next';

type InitMiddleware<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (result: T) => void,
) => void;

export default function initMiddleware<T>(middleware: InitMiddleware<T>) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: T) => {
        if (result instanceof Error) return reject(result);
        return resolve(result);
      });
    });
}
