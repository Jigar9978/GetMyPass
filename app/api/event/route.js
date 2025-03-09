"use server";

import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("events");
    const collection = db.collection("categories");

    // Sare categories ke andar se cards (events) fetch kar rahe hain
    const categories = await collection.find({}).toArray();

    // Har category ke cards ko extract kar ke ek hi array me dal rahe hain
    const events = categories.flatMap(category =>
      category.cards.map(event => ({
        category: category.name,
        ...event
      }))
    );

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
  }
}
