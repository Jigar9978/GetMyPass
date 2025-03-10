import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Make sure you're using the updated URI format

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to avoid repeatedly creating a new client
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
