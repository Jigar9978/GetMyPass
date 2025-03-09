import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function GET(request) {
  try {
    const client = await clientPromise; // Reuse the global client connection
    const database = client.db("events");
    const collection = database.collection("categories");

    const data = await collection.findOne({ name: "popular" });
    const popularCards = data?.cards || [];

    if (popularCards.length === 0) {
      return new Response(JSON.stringify({ message: "No popular cards found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ popular: popularCards }), { status: 200 });
  } catch (error) {
    console.error("Error fetching popular cards:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
