import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    const client = await clientPromise;
    const db = client.db('events');
    const categories = await db.collection('categories').find().toArray();
    return NextResponse.json(categories);
}

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get('name');
    const icon = formData.get('icon');
    const image = formData.get('image'); // File type data

    let imageUrl = '';

    if (image && image.name) {
        const imageFormData = new FormData();
        imageFormData.append('file', image);
        imageFormData.append('upload_preset', 'your_upload_preset'); // Cloudinary Upload Preset

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
            method: 'POST',
            body: imageFormData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url; // Cloudinary से मिला इमेज URL
    }

    const client = await clientPromise;
    const db = client.db('events');
    await db.collection('categories').insertOne({ name, icon, image: imageUrl });

    return new Response(JSON.stringify({ message: 'Category added', imageUrl }), { status: 201 });
}