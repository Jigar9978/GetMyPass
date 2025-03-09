import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "User ID is required." }),
        { status: 400 }
      );
    }

    // Replace spaces with '+' if needed
    userId = userId.replace(/ /g, "+");

    const client = await clientPromise;
    const db = client.db("events");

    const tickets = await db.collection("tickets").find({ userId }).toArray();

    if (!tickets || tickets.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Tickets not found." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, tickets }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error." }),
      { status: 500 }
    );
  }
}
