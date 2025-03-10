import connectToDatabase from '@/lib/mongo';
import jwt from 'jsonwebtoken';

export async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Check if email or password is missing
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are required' });
      }

      // Connect to the database
      const client = await connectToDatabase();
      const db = client.db();

      // Find admin by email
      const admin = await db.collection('admins').findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare entered password with the stored password
      if (password !== admin.password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token if password matches
      const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log("Generated Token:", token); // Log the token for debugging

      // Return the token and success message
      return res.status(200).json({ success: true, token });
    } catch (error) {
      console.error("Error:", error);  // Log the error for debugging
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Handle other HTTP methods like GET, PUT, DELETE
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
