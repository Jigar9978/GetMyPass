import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI;
let client;

// Make sure the MongoDB client is initialized only once
if (!client) {
  client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
}

export async function GET() {
  try {
    // Ensure the connection is established before interacting with the database
    if (!client.isConnected()) {
      await client.connect();
    }

    const db = client.db("events");  // Specify the database name
    const categoriesCollection = db.collection("categories");

    const popularCategory = await categoriesCollection.findOne({ name: "popular" });

    if (!popularCategory || !popularCategory.cards) {
      return NextResponse.json({ cards: [] }, { status: 200 });
    }

    return NextResponse.json({ cards: popularCategory.cards }, { status: 200 });
  } catch (error) {
    console.error("MongoDB error:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
