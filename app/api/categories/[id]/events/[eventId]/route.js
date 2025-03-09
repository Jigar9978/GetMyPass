import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ Update Event API (PUT)
export async function PUT(req, { params }) {
    const { id, eventId } = await params; // Category ID and Event ID from URL
    const data = await req.json();

    try {
        const { db } = await connectToDatabase(); // ✅ Correctly destructure db
        const collection = db.collection("categories");

        // ✅ Convert IDs to ObjectId
        const categoryObjectId = new ObjectId(id);
        const eventObjectId = new ObjectId(eventId);

        // ✅ Update the event inside the "cards" array
        const result = await collection.updateOne(
            { _id: categoryObjectId, "cards._id": eventObjectId },
            { $set: { "cards.$": { ...data, _id: eventObjectId } } } // ✅ Keep same _id
        );

        if (result.modifiedCount === 1) {
            return new Response(JSON.stringify(data), { status: 200 });
        } else {
            return new Response("Error updating event", { status: 400 });
        }
    } catch (error) {
        console.error("PUT Error:", error);
        return new Response("Database error", { status: 500 });
    }
}

// ✅ Delete Event API (DELETE)
export async function DELETE(req, { params }) {
    const { id, eventId } = await params; // Category ID and Event ID from URL

    try {
        const { db } = await connectToDatabase(); // ✅ Correctly destructure db
        const collection = db.collection("categories");

        // ✅ Convert IDs to ObjectId
        const categoryObjectId = new ObjectId(id);
        const eventObjectId = new ObjectId(eventId);

        // ✅ Remove the event from the "cards" array
        const result = await collection.updateOne(
            { _id: categoryObjectId },
            { $pull: { cards: { _id: eventObjectId } } } // ✅ Match event _id properly
        );

        if (result.modifiedCount === 1) {
            return new Response("Event deleted successfully", { status: 200 });
        } else {
            return new Response("Error deleting event", { status: 400 });
        }
    } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Database error", { status: 500 });
    }
}
