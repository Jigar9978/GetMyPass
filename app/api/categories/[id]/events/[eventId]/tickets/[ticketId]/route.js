import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  try {
    const { id, eventId, ticketId } = await params; // Extract params directly

    const data = await req.json();
    
    // MongoDB connection
    const { db } = await connectToDatabase();
    const collection = db.collection("categories");

    // Convert the IDs to ObjectId type
    const categoryObjectId = new ObjectId(id);
    const eventObjectId = new ObjectId(eventId);
    const ticketObjectId = new ObjectId(ticketId);

    // Update ticket inside the category, event, and ticket array
    const result = await collection.updateOne(
      {
        _id: categoryObjectId, // Filter by category ID
        "cards._id": eventObjectId, // Filter by event ID within the 'cards' array
        "cards.tickets._id": ticketObjectId // Filter by ticket ID within the 'tickets' array in the event
      },
      {
        $set: {
          // Set the new ticket data
          "cards.$[event].tickets.$[ticket]": {
            ...data, 
            _id: ticketObjectId // Preserve the ticket's _id
          }
        }
      },
      {
        arrayFilters: [
          { "event._id": eventObjectId },  // Filter by event ID in the 'cards' array
          { "ticket._id": ticketObjectId }  // Filter by ticket ID in the 'tickets' array within the event
        ]
      }
    );

   

    // Check the result of the update operation
    if (result.modifiedCount === 1) {
      return new Response(JSON.stringify({ message: "Ticket updated successfully" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Ticket not found or no changes made" }), { status: 400 });
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response(JSON.stringify({ message: "Database error" }), { status: 500 });
  }
}
