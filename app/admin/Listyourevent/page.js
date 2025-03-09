"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListYourEventTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/get-listevent");
        const data = await response.json();

        if (response.ok) {
          setEvents(data);
          toast.success("New event data loaded!");
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        toast.error("Error fetching events!");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 w-full min-w-[1000px] mx-auto">
     <h2 className="text-2xl font-bold mb-1 top-0 bg-white p-4 shadow-md z-10">
            Listevent Management
          </h2>
      
      <table className="w-full border border-gray-300">
      <thead className="bg-gray-200 text-black sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">People</th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => (
            <tr key={event._id} className="border-b">
              <td className="px-4 py-2">{event.name}</td>
              <td className="px-4 py-2">{event.phone}</td>
              <td className="px-4 py-2">{event.email}</td>
              <td className="px-4 py-2">{event.category}</td>
              <td className="px-4 py-2">{event.people}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="px-4 py-2 text-center">
              No event records available
            </td>
          </tr>
        )}
      </tbody>
    </table>
   
    </div>
   
  );
};

export default ListYourEventTable;
