import mongoose, { Model, Schema, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface User {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

userSchema.set('toObject', { virtuals: true });

const UserModel: Model<User> =
  models.user || mongoose.model<User>('user', userSchema);

export default UserModel;
