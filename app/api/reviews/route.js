import { connectToDatabase } from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === "POST") {
    const { firstName, lastName, description, rating, source } = await req.json();

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection("reviews");

      const newReview = {
        firstName,
        lastName,
        description,
        rating,
        clientType: source === "client" ? "client" : "user",
        createdAt: new Date(),
      };

      await collection.insertOne(newReview);
      return NextResponse.json({ message: "Review submitted successfully!" }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to submit review" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("reviews");

    const reviews = await collection.find().toArray();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ message: "Failed to fetch reviews" }, { status: 500 });
  }
}
