// app/api/categories/[id]/events/route.js

import { connectToDatabase } from "@/lib/mongodb"; // MongoDB connection helper
import { ObjectId } from "mongodb";

const getDatabase = async () => {
  const { db } = await connectToDatabase();
  return db;
};

// ✅ Add Event API (Now with _id)
export async function POST(req, { params }) {
  const { id } = await params;
  const eventData = await req.json();

  // ✅ Ensure event has a unique _id
  const newEvent = {
    _id: new ObjectId(), // 👈 Generate unique MongoDB ObjectId
    ...eventData,
  };

  const db = await getDatabase();
  const categoriesCollection = db.collection("categories");

  const updateResult = await categoriesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $push: { cards: newEvent } } // 👈 Now pushing event with _id
  );

  if (updateResult.modifiedCount === 0) {
    return new Response("Failed to add event", { status: 500 });
  }

  return new Response(JSON.stringify(newEvent), { status: 201 }); // 👈 Returning event with _id
}

// ✅ Get Events API
export async function GET(req, { params }) {
  const { id } = await params;

  const db = await getDatabase();
  const categoriesCollection = db.collection("categories");

  const category = await categoriesCollection.findOne({ _id: new ObjectId(id) });
  if (!category) {
    return new Response("Category not found", { status: 404 });
  }

  return new Response(JSON.stringify(category.cards || []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
