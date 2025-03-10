import connectToDatabase from '@/lib/mongo';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and Password are required' }), { status: 400 });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('events'); // सही डेटाबेस चुनें

    // Find admin by email (email को lowercase में करें)
    const admin = await db.collection('admins').findOne({ email: email.toLowerCase() });
    console.log("Admin Data from DB:", admin);  // यह देखें कि MongoDB से डेटा आ रहा है या नहीं

    if (!admin) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Compare password (Debugging के लिए console.log डालें)
    console.log("Stored Password:", admin.password);
    console.log("Entered Password:", password);

    if (password !== admin.password) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log("Generated Token:", token);

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
