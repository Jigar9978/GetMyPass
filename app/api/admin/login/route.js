import connectToDatabase from '@/lib/mongo';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and Password are required' }), { status: 400 });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db();

    // Find admin by email
    const admin = await db.collection('admins').findOne({ email: email.toLowerCase() });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }
    console.log(admin)
    console.log(admin.password)

    // Directly compare entered password with the stored password in database
    if (password !== admin.password) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Generate JWT token if password matches
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated Token:", token); // Log the token

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);  // Log the error for debugging
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
