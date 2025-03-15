import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import clientPromise from '@/lib/mongodb'; // MongoDB connection

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get("name");
    const icon = formData.get("icon");
    const imageFile = formData.get("image"); // Yeh File object hai

    let imageUrl = "";

    if (imageFile) {
        try {
            // Image ko ArrayBuffer se Buffer mein convert karna
            const bufferStream = new Readable();
            const imageBuffer = Buffer.from(await imageFile.arrayBuffer()); // ArrayBuffer ko Buffer mein convert kar rahe hain
            bufferStream.push(imageBuffer);
            bufferStream.push(null); // Stream ko end kar rahe hain

            // Cloudinary ko image buffer upload karna
            const uploadResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    {
                        resource_type: "auto", // Automatically detect file type
                        folder: 'categories',  // 'categories' folder mein upload karenge
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                // End the stream after wrapping it in a promise
                bufferStream.pipe(uploadStream);
            });

            // Cloudinary se image URL mil raha hai
            imageUrl = uploadResponse.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return NextResponse.json({ message: 'Image upload failed', error: error.message }, { status: 500 });
        }
    }

    // MongoDB mein category ko save karna
    const client = await clientPromise;
    const db = client.db('events');
    await db.collection('categories').insertOne({ name, icon, image: imageUrl });

    return NextResponse.json({ message: 'Category added', imageUrl }, { status: 201 });
}



export async function GET() {
    const client = await clientPromise;
    const db = client.db('events');
    const categories = await db.collection('categories').find().toArray();
    return NextResponse.json(categories);
}




