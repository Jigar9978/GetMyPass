import clientPromise from '../../../lib/mongodb'; // Correct import of MongoDB connection
import Link from 'next/link'; // Ensure Link is imported
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import Image from 'next/image';

// Function that fetches data
export default async function CategoryPage({ params }) {
  const { name } = await params; // Destructure the name from params
  const decodedName = decodeURIComponent(name);

  try {
    // Connect to MongoDB using the clientPromise
    const client = await clientPromise;
    const db = client.db('events'); // Database name
    const collection = db.collection('categories'); // Collection name

    const categoryData = await collection.findOne({
      name: { $regex: new RegExp(`^${decodedName}$`, "i") }
    });

    if (!categoryData || !categoryData.cards || categoryData.cards.length === 0) {
      return (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">No events found for category {name}</h1>
        </div>
      );
    }

    return (
      <div className="max-w-6xl md:mx-auto py-10 mx-4">
        <h1 className="text-3xl font-bold text-center mb-8">{decodedName} Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.cards.map((event) => (
            <div key={event.title} className="w-full bg-white snap-center rounded-lg overflow-hidden shadow-md transition-transform duration-300 min-w-[250px] hover:translate-y-[-10px]">
              <div className="bg-gray-700 h-48 w-full">
                <Image src={event.image} alt={event.title} width={500} 
  height={128} className="w-full h-full object-cover rounded-md"/>
              </div>
              <p className="mt-2 pl-3 text-sm text-gray-500">{event.date}</p>
              <h3 className="mt-1 pl-3 text-lg font-semibold text-gray-800">{event.title}</h3>
              <div className="pl-3 flex item-center mt-2">
                <FaMapMarkerAlt className="text-xl text-black mt-1" />
                <p className="ml-1 text-lg text-black">{event.location}</p>
              </div>
              <div className="px-3 py-2 flex justify-between items-center mt-2 border-t border-gray-200">
                <div className="flex items-center">
                  <FaRupeeSign className="text-lg text-black" />
                  <p className="text-lg text-black font-bold mt-0.5">{event.price}</p>
                </div>
                <div>
                  <Link href={`/category/${name}/${event.title}`}>
                    <button className="py-1.5 px-4 bg-[#a355b8] text-white rounded-md focus:outline-none">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category data:", error);
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Something went wrong while fetching data!</h1>
      </div>
    );
  }
}
