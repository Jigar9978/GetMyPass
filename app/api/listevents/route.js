// app/api/listevents/route.js

import { connectToDatabase } from '../../../lib/mongooo';
import Event from '../../../models/Event';

// POST method handler
export async function POST(req) {
  try {
    const { name, phone, email, category, people } = await req.json();

    // MongoDB ke saath connect karen
    const { db } = await connectToDatabase();

    // Event ko save karen
    const newEvent = await db.collection('events').insertOne({
      name,
      phone,
      email,
      category,
      people,
      createdAt: new Date(),
    });

    // Success response bhejein
    return new Response(JSON.stringify({ message: 'Event saved successfully!', event: newEvent }), { status: 200 });
  } catch (error) {
    console.error("Error saving event:", error);
    return new Response(JSON.stringify({ message: 'Error saving event data!', error: error.message }), { status: 500 });
  }
}
