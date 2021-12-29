import mongoose, { Mongoose } from 'mongoose';

const { DB_USERNAME, DB_PASSWORD } = process.env;

let connectCache: Mongoose;

// connect
export const connectToDatabase = async (db: string) => {
  if (!connectCache) {
    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.gmq1f.mongodb.net/${db}?retryWrites=true&w=majority`;
    console.log(uri);
    connectCache = await mongoose.connect(uri);
  }

  return connectCache;
};
