import { connectToDatabase } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req, { params }) {
  const { id } = await params; // ✅ params ko directly use karna

  const formData = await req.formData();
  const name = formData.get("name");
  const icon = formData.get("icon");
  const image = formData.get("image"); // File type data

  let imageUrl = "";

  if (image && image.name) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "categories" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      return new Response(JSON.stringify({ message: "Cloudinary upload failed", error }), { status: 500 });
    }
  }

  const { db } = await connectToDatabase();

  try {
    const updateData = { name, icon };
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const result = await db.collection("categories").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Category not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Category updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating category", error }), { status: 500 });
  }
}

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

