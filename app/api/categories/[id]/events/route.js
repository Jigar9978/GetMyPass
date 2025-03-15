import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const getDatabase = async () => {
  const { db } = await connectToDatabase();
  return db;
};

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const eventData = await req.json();

    if (!eventData.image || !eventData.image.startsWith("https://res.cloudinary.com")) {
      return new Response(JSON.stringify({ error: "Invalid Image URL" }), { status: 400 });
    }

    const newEvent = {
      _id: new ObjectId(),
      ...eventData,
    };

    const db = await getDatabase();
    const categoriesCollection = db.collection("categories");

    const updateResult = await categoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { cards: newEvent } }
    );

    if (updateResult.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Failed to add event" }), { status: 500 });
    }

    return new Response(JSON.stringify(newEvent), { status: 201 });

  } catch (error) {
    console.error("Error saving event:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
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
