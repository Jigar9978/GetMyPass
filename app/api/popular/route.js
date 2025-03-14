import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI;

let client;
let clientPromise;

// MongoDB कनेक्शन को एक बार इनिशियलाइज़ करें और इसे फिर से उपयोग करें
if (!client) {
  client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
  clientPromise = client.connect();
}

export async function GET() {
  try {
    // सुनिश्चित करें कि कनेक्शन एक्टिव है
    await clientPromise;
    const db = client.db("events");  // डेटाबेस का नाम दें
    const categoriesCollection = db.collection("categories");

    const popularCategory = await categoriesCollection.findOne({ name: "popular" });

    if (!popularCategory || !popularCategory.cards) {
      return NextResponse.json({ cards: [] }, { status: 200 });
    }

    return NextResponse.json({ cards: popularCategory.cards }, { status: 200 });
  } catch (error) {
    console.error("MongoDB error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
