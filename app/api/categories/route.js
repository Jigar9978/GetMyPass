// pages/api/categories.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { writeFile } from "fs/promises";
import path from "path";
import { ObjectId } from "mongodb";

export async function GET() {
    const client = await clientPromise;
    const db = client.db('events');
    const categories = await db.collection('categories').find().toArray();
    return NextResponse.json(categories);
}

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get("name");
    const icon = formData.get("icon");
    const image = formData.get("image"); // File type data

    let imageUrl = "";

    if (image && image.name) {
        const bytes = await image.arrayBuffer(); // Convert image to buffer
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), "public/uploads"); // Public/uploads path
        const imageName = `${Date.now()}-${image.name}`;
        const imagePath = path.join(uploadDir, imageName);

        await writeFile(imagePath, buffer); // Save file
        imageUrl = `/uploads/${imageName}`; // Publicly accessible URL
    }
    const client = await clientPromise;
    const db = client.db('events');
    await db.collection("categories").insertOne({ name, icon, image: imageUrl });

    return new Response(JSON.stringify({ message: "Category added", imageUrl }), { status: 201 });
}





