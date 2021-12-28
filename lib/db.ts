import mongoose, { Mongoose } from 'mongoose';

const { DB_USERNAME, DB_PASSWORD, DB_PROJECT_NAME, DB_NAME } = process.env;

let connectCache: Mongoose;

// connect
export const connectToDatabase = async () => {
  if (!connectCache) {
    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.gmq1f.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    console.log(uri);
    connectCache = await mongoose.connect(uri);
  }

  return connectCache;
};
