import connectToDatabase from '@/lib/mongo';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email,password)

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and Password are required' }), { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db();

    // Find admin by email
    const admin = await db.collection('admins').findOne({ email });
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Compare entered password with the stored password
    if (password !== admin.password) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Generate JWT token if password matches
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated Token:", token); // Log the token for debugging

    // Return the token and success message
    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);  // Log the error for debugging
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
