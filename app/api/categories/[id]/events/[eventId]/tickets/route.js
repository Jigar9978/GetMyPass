import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const getDatabase = async () => {
  const { db } = await connectToDatabase();
  return db;
};

// ✅ Add Ticket API (Now with _id)
export async function POST(req, { params }) {
  try {
    const { id, eventId } = await params;
    const ticketData = await req.json();

    // ✅ Ensure ticket has a unique _id
    const newTicket = {
      _id: new ObjectId(), // 👈 Generate unique MongoDB ObjectId
      ...ticketData,
    };

    const db = await getDatabase();
    const categoriesCollection = db.collection("categories");

    const updateResult = await categoriesCollection.updateOne(
      { _id: new ObjectId(id), "cards._id": new ObjectId(eventId) },
      { $push: { "cards.$.tickets": newTicket } } // 👈 Push ticket inside event
    );

    if (updateResult.modifiedCount === 0) {
      return new Response("Failed to add ticket", { status: 500 });
    }

    return new Response(JSON.stringify(newTicket), { status: 201 });
  } catch (error) {
    console.error("Error adding ticket:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// ✅ Get Tickets API
export async function GET(req, { params }) {
  try {
    const { id, eventId } = await params;

    const db = await getDatabase();
    const categoriesCollection = db.collection("categories");

    const category = await categoriesCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { cards: 1 } }
    );

    if (!category) {
      return new Response("Category not found", { status: 404 });
    }

    // ✅ Find the event by eventId
    const event = category.cards.find(event => event._id.toString() === eventId);
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response(JSON.stringify(event.tickets || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// ✅ Delete Ticket API
export async function DELETE(req, { params }) {
  try {
    const { id, eventId } = await params;
    const { ticketId } = await req.json();

    const db = await getDatabase();
    const categoriesCollection = db.collection("categories");

    const updateResult = await categoriesCollection.updateOne(
      { _id: new ObjectId(id), "cards._id": new ObjectId(eventId) },
      { $pull: { "cards.$.tickets": { _id: new ObjectId(ticketId) } } } // 👈 Remove ticket
    );

    if (updateResult.modifiedCount === 0) {
      return new Response("Failed to delete ticket", { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Ticket deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
