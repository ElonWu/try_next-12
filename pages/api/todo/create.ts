import type { NextApiRequest, NextApiResponse } from 'next';

import { Todo } from '@models/todo';
import { createTodo } from '@services/todo';
import { withSessionRoute } from '@lib/session';

const handler = async (req: NextApiRequest, res: NextApiResponse<Todo>) => {
  if (req.method === 'POST') {
    const todo: Todo = await createTodo(
      // @ts-ignore
      Object.assign({}, req.body, { creator: req.session.user._id }),
    );
    res.status(200).json(todo);
  }
};

export default withSessionRoute(handler);
