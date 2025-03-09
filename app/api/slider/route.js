import clientPromise from '@/lib/mongodb';

/**
 * API Endpoint: GET /api/slider
 * Description: Fetches the document with name 'slider' from the 'categories' collection in MongoDB.
 */
export async function GET(req) {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db('events'); // Replace with your database name
    const collection = db.collection('categories'); // Replace with your collection name

    // Fetch the document with the name 'slider'
    const data = await collection.findOne(
      { name: 'slider' }, // Query to match the document
      { projection: { cards: 1, name: 1 } } // Projection to fetch only the 'cards' and 'name' fields
    );

    // Check if data is found
    if (!data) {
      return new Response(JSON.stringify({ error: 'No data found for slider' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the fetched data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching slider data:', error);

    // Return an error response
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
