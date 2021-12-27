// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type UserRes = {
  username: string
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserRes>
) {
  res.status(200).json({ username: 'this is user list' })
}
