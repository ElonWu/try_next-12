import { connectToDatabase } from '@lib/db';

import UserModel, { User } from '@models/user';
import TodoModel, { Todo } from '@models/todo';

export const getTodos = async (filters?: any) => {
  await connectToDatabase('bi');
  return TodoModel.find({}, null, { limit: 10 }).populate<{ creator: User }>({
    path: 'creator',
    model: UserModel,
  });
};

export const createTodo = async (payload: Todo) => {
  await connectToDatabase('bi');

  const todo: Todo = await TodoModel.create(payload);

  return todo;
};
