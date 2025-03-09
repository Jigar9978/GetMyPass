import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in your .env.local file');
}

let cachedClient = null;

export default async function connectToDatabase() {
  if (!cachedClient) {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    cachedClient = await client.connect();
  }
  return cachedClient;
}
