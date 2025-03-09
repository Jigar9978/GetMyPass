import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("events"); // Apna database choose karein
    const collection = db.collection("categories"); // Apne collection ka naam yahan likhein
    const data = await collection.find({}).toArray(); // Data fetch kar rahe hain

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
}
