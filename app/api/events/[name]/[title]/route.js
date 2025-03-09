import clientPromise from "../../../../../lib/mongodb";

export async function GET(req, { params }) {
  try {
    // Extract 'name' and 'title' from 'params' (dynamic route params)
    const { name, title } = await params; // No need to await

    // Decode the values if they are URL encoded
    const decodedName = decodeURIComponent(name);
    const decodedTitle = decodeURIComponent(title);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("events");
    const collection = db.collection("categories");

    // Query the database to find the event based on decoded 'name' and 'title'
    const event = await collection.findOne({
      "name": decodedName,          // Match the category name
      "cards.title": decodedTitle   // Match the event title inside the 'cards' array
    });

    // If the event is found, extract the card and return it
    if (event) {
      // Find the card with the matching title in the 'cards' array
      const card = event.cards.find(card => card.title === decodedTitle);

      // If the card is found, check for tickets and return them
      if (card) {
        if (Array.isArray(card.tickets) && card.tickets.length > 0) {
          return new Response(
            JSON.stringify({ card, tickets: card.tickets }), 
            { headers: { "Content-Type": "application/json" } }
          );
        } else {
          // If no tickets are found in the card
          return new Response("Tickets not found for this event", { status: 404 });
        }
      } else {
        return new Response("Event card not found", { status: 404 });
      }
    } else {
      // If no event is found, return a 404 error
      return new Response("Event not found", { status: 404 });
    }
  } catch (error) {
    // Log error and return a 500 server error response
    console.error("Error fetching event data:", error);
    return new Response(`Failed to fetch data: ${error.message}`, { status: 500 });
  }
}
