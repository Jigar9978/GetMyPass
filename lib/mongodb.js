  import { MongoClient } from 'mongodb';

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

let client;
let clientPromise;

// Check if we are in production or development environment
if (process.env.NODE_ENV === 'production') {
  client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
  clientPromise = client.connect();
} else {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(MONGODB_URI, { useUnifiedTopology: true }).connect();
  }
  clientPromise = global._mongoClientPromise;
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("events");  // तुम्हारे database का नाम
  return { db };
}
// Export clientPromise as connectDB function
export default clientPromise;
