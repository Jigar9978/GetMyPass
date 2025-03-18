"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import Image from "next/image";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/event");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl py-10">Loading events...</div>;
  }

  if (!events.length) {
    return <div className="text-center text-2xl py-10">No events found!</div>;
  }

  return (
    <div className="max-w-6xl mx-3 md:mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
          key={event._id ? event._id.toString() : event.title} 
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:translate-y-[-5px]"
          >
            <Image width={500} 
  height={128} src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500">{event.date}</p>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="text-red-500" />
                <p className="ml-2 text-gray-600">{event.location}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-700" />
                  <p className="ml-0.5 text-lg font-bold">{event.price}</p>
                </div>
                <Link href={`/category/${event.category}/${event.title}`}>
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
}
