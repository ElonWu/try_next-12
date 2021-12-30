import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../../types/socket';

const handler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === 'POST') {
    // get message
    const { message } = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit('message', message);

    // return message
    res.status(201).json({ message: 'end' });
  }
};

export default handler;
