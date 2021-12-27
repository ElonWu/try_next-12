// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type UserReq = {
  username: string
}

type UserRes = {
  username: string
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserRes>
) {
  const query = req.query as UserReq;
  const body = req.body;

  console.log(query)
  res.status(200).json({ username: query?.username })
}
