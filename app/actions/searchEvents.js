"use server"; // ✅ Ensure this runs only on the server

import { connectToDatabase } from "@/lib/mongodb"; // Import MongoDB connection function

export async function searchEvents(query) {
  if (!query) return []; // Return empty array if query is empty

  const { db } = await connectToDatabase();
  const categoriesCollection = db.collection("categories");

  // 🔹 MongoDB Aggregation Query (Instant Search within cards)
  const results = await categoriesCollection.aggregate([
    { $unwind: "$cards" }, // Unwind the `cards` array to access each card separately
    {
      $match: {
        "cards.title": { $regex: `^${query}`, $options: "i" }, // Case-insensitive search for title matching query
      },
    },
    {
      $project: {
        _id: 0,
        category: "$name", // Add the category name to the result
        title: "$cards.title",
        date: "$cards.date",
        location: "$cards.location",
        description: "$cards.description",
        image: "$cards.image", // Event image
        time: "$cards.time",
      },
    },
  ]).toArray();

  return results; // Return the results from the aggregation query
}
