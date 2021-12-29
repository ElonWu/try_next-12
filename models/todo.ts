import mongoose, { Schema, models } from 'mongoose';
import type { Model } from 'mongoose';
import type { User } from '@models/user';

// 1. Create an interface representing a document in MongoDB.
export interface Todo {
  title: string;
  creator?: Schema.Types.ObjectId;
}

export type TodoWithCreator = Todo & {
  _id: string;
  creator: User;
};

// 2. Create a Schema corresponding to the document interface.
const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

todoSchema.set('toObject', { virtuals: true });

const TodoModel: Model<Todo> =
  models.todo || mongoose.model<Todo>('todo', todoSchema);

export default TodoModel;
