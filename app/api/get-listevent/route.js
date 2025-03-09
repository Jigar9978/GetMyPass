import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // ✅ Tumhari MongoDB connection file

export async function GET() {
  try {
    const { db } = await connectToDatabase(); // ✅ MongoDB se connect ho raha hai
    const events = await db.collection("events").find({}).toArray(); // ✅ Events collection se data fetch ho raha hai

    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
