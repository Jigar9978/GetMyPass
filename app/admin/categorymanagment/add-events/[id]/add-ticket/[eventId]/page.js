'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

const AddTicket = ({ params }) => {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState(null);
  const { id, eventId } = resolvedParams || {};
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tickets from MongoDB
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`/api/categories/${id}/events/${eventId}/tickets`);
        const data = await res.json();
        console.log("Fetched Tickets:", data); // Debugging

        if (Array.isArray(data)) {
          setTickets(data); // Correctly set tickets
        } else {
          console.error('Invalid data format:', data); // Error logging
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (id && eventId) {
      fetchTickets();
    }
  }, [id, eventId]);

  useEffect(() => {
    // Unwrap params
    const getParams = async () => {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    };
    getParams();
  }, [params]);

  const addTicket = () => {
    setIsEditing(true);
    setSelectedTicket({
      type: '',
      price: '',
      contity: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to`, value); // Debugging
    setSelectedTicket((prev) => ({ ...prev, [name]: value }));
  };

  const saveTicket = async () => {
    try {
      console.log("Sending Ticket Data:", selectedTicket);

      let res;
      if (selectedTicket._id) {
        // If _id exists, it's an edit, so we update the ticket
        res = await fetch(`/api/categories/${id}/events/${eventId}/tickets/${selectedTicket._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedTicket),
        });
      } else {
        // Otherwise, we are adding a new ticket
        res = await fetch(`/api/categories/${id}/events/${eventId}/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedTicket),
        });
      }

      const responseData = await res.json();
      console.log("API Response:", responseData);

      if (!res.ok) {
        console.error("Error Response:", responseData); // Add logging for better debugging
        throw new Error(`Failed to save ticket: ${responseData.message || "Unknown error"}`);
      }

      // Update ticket or add new ticket based on response
      if (selectedTicket._id) {
        setTickets(tickets.map(ticket => ticket._id === selectedTicket._id ? selectedTicket : ticket));
      } else {
        const newTicket = { ...selectedTicket, _id: responseData._id };
        setTickets([...tickets, newTicket]);
      }

      setIsEditing(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error('Error adding/updating ticket:', error);
    }
  };


  const deleteTicket = async (ticketId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/categories/${id}/events/${eventId}/tickets`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticketId }),
        });

        if (res.ok) {
          setTickets(tickets.filter((ticket) => ticket._id !== ticketId)); // Correctly filter by _id
        }
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="min-h-screen p-6 w-[1110px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center flex-grow">Event Management</h1>

          {/* Back Button with Icon */}
          <Link
            href={`/admin/categorymanagment/add-events/${id}`}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            <ArrowLeft size={20} /> Back
          </Link>
        </div>
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg transition hover:scale-105">
              <h3 className="font-bold">Total Tickets</h3>
              <p className="text-2xl">{tickets.length}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ticket Management</h2>
          <button
            onClick={addTicket}
            className="mb-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Add Ticket
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="p-4 bg-white shadow-md rounded-lg relative">
                <span className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => deleteTicket(ticket._id)}>
                  ❌
                </span>
                <h3 className="text-xl font-bold">{ticket.type}</h3>
                <p className="mt-2">{ticket.description}</p>
                <p className="mt-2">
                  <strong>Price:</strong> ${ticket.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticket.contity}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setIsEditing(true);
                    }}
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Editing Form */}
          {isEditing && selectedTicket && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{selectedTicket._id ? 'Edit Ticket' : 'Add Ticket'}</h3>
                <label className="block mb-2 font-semibold">Ticket Type:</label>
                <input
                  type="text"
                  name="type"
                  value={selectedTicket.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-4 border rounded-md"
                />
                <label className="block mb-2 font-semibold">Ticket Price:</label>
                <input
                  type="number"
                  name="price"
                  value={selectedTicket.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-4 border rounded-md"
                />
                <label className="block mb-2 font-semibold">Ticket Quantity:</label>
                <input
                  type="number"
                  name="contity"
                  value={selectedTicket.contity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-4 border rounded-md"
                />
                <label className="block mb-2 font-semibold">Ticket Description:</label>
                <textarea
                  name="description"
                  value={selectedTicket.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-4 border rounded-md"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedTicket(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTicket}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save Ticket
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AddTicket;
