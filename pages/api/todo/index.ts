import type { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '@models/todo';
import { getTodos } from '@services/todo';

type TodoRes = Todo[];

const handler = async (req: NextApiRequest, res: NextApiResponse<TodoRes>) => {
  const todos = await getTodos();
  res.status(200).json(todos);
};

export default handler;
