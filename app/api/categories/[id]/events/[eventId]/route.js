import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ Update Event API (PUT) with Cloudinary Image URL Update
export async function PUT(req, { params }) {
    const { id, eventId } = params; // Category ID and Event ID from URL
    const data = await req.json();

    console.log("Received data:", data); // Log the received data for debugging

    try {
        const { db } = await connectToDatabase(); // ✅ Correctly destructure db
        const collection = db.collection("categories");

        // ✅ Convert IDs to ObjectId
        const categoryObjectId = new ObjectId(id);
        const eventObjectId = new ObjectId(eventId);

        // ✅ Check if the image URL is from Cloudinary
        if (data.image && data.image.includes("cloudinary")) {
            // If the image URL is from Cloudinary, we update the image field
            const updatedData = {
                ...data, // Keep the rest of the data
                image: data.image // Cloudinary image URL will be updated
            };

            // ✅ Update the event inside the "cards" array with Cloudinary image
            const result = await collection.updateOne(
                { _id: categoryObjectId, "cards._id": eventObjectId }, // Find the event inside the cards array
                { 
                    $set: { 
                        "cards.$": { 
                            ...updatedData, // Spread the updated data (with Cloudinary URL)
                            _id: eventObjectId // Ensure the _id stays the same
                        } 
                    }
                }
            );

            console.log("Update result:", result); // Log the result of the update operation

            if (result.modifiedCount === 1) {
                return new Response(JSON.stringify(updatedData), { status: 200 });
            } else {
                return new Response("Error updating event", { status: 400 });
            }
        } else {
            // If there is no Cloudinary image URL, just update the event without changing the image
            const result = await collection.updateOne(
                { _id: categoryObjectId, "cards._id": eventObjectId },
                { 
                    $set: { 
                        "cards.$": { 
                            ...data, 
                            _id: eventObjectId // Keep the original _id
                        } 
                    }
                }
            );

            console.log("Update result:", result); // Log the result of the update operation

            if (result.modifiedCount === 1) {
                return new Response(JSON.stringify(data), { status: 200 });
            } else {
                return new Response("Error updating event", { status: 400 });
            }
        }
    } catch (error) {
        console.error("PUT Error:", error);
        return new Response(`Database error: ${error.message}`, { status: 500 });
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
