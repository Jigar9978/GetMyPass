import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import path from "path";
import { writeFile } from "fs/promises";

export async function DELETE(req, context) {
    const { params } = await context;  // ✅ params को await करो
    const { id } = await params;

    const { db } = await connectToDatabase();

    try {
        const result = await db.collection("categories").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ message: "Category not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Category deleted successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error deleting category", error }), { status: 500 });
    }
}


export async function PUT(req, { params }) {
    const { id } = await params; // ✅ params को directly use करो

    const formData = await req.formData();
    const name = formData.get("name");
    const icon = formData.get("icon");
    const image = formData.get("image"); // File type data

    let imageUrl = "";

    if (image && image.name) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imageName = `${Date.now()}-${image.name}`;
        const imagePath = path.join(process.cwd(), "public/uploads", imageName);

        await writeFile(imagePath, buffer);
        imageUrl = `/uploads/${imageName}`;
    }

    const { db } = await connectToDatabase();

    try {
        const result = await db.collection("categories").updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, icon, image: imageUrl || undefined } } // अगर नई image नहीं है तो पुरानी वाली रहेगी
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "Category not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Category updated successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error updating category", error }), { status: 500 });
    }
}   

