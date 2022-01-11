import { firestore } from '@lib/firebase';
import { Record } from '@type/record';

export interface User {
  name: string;
  age?: number;
  avatar?: string;
}

export const getUsers = async () => {
  const userCollection = firestore.collection('users');

  const snapshot = await userCollection.get();

  let result: Record<User>[] = [];

  snapshot.forEach((doc) => {
    const user = doc.data();
    result.push(Object.assign({}, user as User, { id: doc.id }));
  });

  return result;
};

export const createUser = async (user: User) => {
  const userCollection = firestore.collection('users');

  await userCollection.add(user);
};

export const updateUser = async (id: string, user: User) => {
  const userCollection = firestore.collection('users');

  const existed = await userCollection.doc(id);

  if (existed) await user;
};
