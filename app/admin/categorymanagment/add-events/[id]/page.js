"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const AddEvent = () => {
    const router = useRouter();
    const { id } = useParams(); // Using useParams to get id from URL
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [eventData, setEventData] = useState(false);

    useEffect(() => {
        if (!id) {
        } else {
            // Fetch existing events based on id
            fetch(`/api/categories/${id}/events`)
                .then((res) => res.json())
                .then((data) => {
                    setEvents(data);
                })
                .catch((err) => console.log("Error fetching events:", err));
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_upload_preset"); // 🔹 Cloudinary का सही Upload Preset डालें
    
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/ddof1f89l/image/upload", {
                method: "POST",
                body: formData,
            });
    
            const data = await res.json();
            if (res.ok) {
                setSelectedEvent({ ...selectedEvent, image: data.secure_url }); // ✅ Cloudinary Image URL Set करें
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            alert("Something went wrong!");
        }
    };
    
    


    const saveEvent = async () => {
        if (!selectedEvent.image || !selectedEvent.image.startsWith("https://res.cloudinary.com")) {
            alert("Please upload an image first!");
            return;
        }
    
        if (id) {
            const res = await fetch(`/api/categories/${id}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEvent),
            });
    
            if (res.ok) {
                const newEvent = await res.json();
                setEvents([...events, newEvent]);
                setIsEditing(false);
                setSelectedEvent(null);
            } else {
                alert("Failed to save event");
            }
        }
    };
    
    



    const updateEvent = async () => {
        if (selectedEvent && selectedEvent._id) {
            // Ensure that the selectedEvent includes the Cloudinary image URL
            if (selectedEvent.image && selectedEvent.image.includes("cloudinary")) {
                // If the image is from Cloudinary, we can proceed with updating the event
                const res = await fetch(`/api/categories/${id}/events/${selectedEvent._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedEvent), // Sending the event data including Cloudinary image
                });
    
                if (res.ok) {
                    const updatedEvent = await res.json();
                    setEvents(events.map((event) =>
                        event._id === selectedEvent._id ? updatedEvent : event
                    ));
                    setIsEditing(false);
                    setSelectedEvent(null);
                } else {
                    alert("Failed to update event");
                }
            } else {
                // Handle case where image is not from Cloudinary (if it's still empty or invalid)
                alert("Invalid or missing image URL. Please ensure the image is uploaded correctly.");
            }
        }
    };
    

    const deleteEvent = (eventId) => {
        console.log("Deleting event with ID:", eventId); // Debugging के लिए

        if (!eventId) {
            alert("Event ID not found!");
            return;
        }

        const confirmation = window.confirm("Are you sure you want to delete this event?");
        if (confirmation) {
            fetch(`/api/categories/${id}/events/${eventId}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        setEvents(events.filter((event) => event._id !== eventId));
                    } else {
                        alert("Failed to delete event");
                    }
                })
                .catch((err) => console.log("Error deleting event:", err));
        }
    };



    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow min-h-screen w-[1110px] p-6 overflow-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-center flex-grow">Event Management</h1>

                    {/* Back Button with Icon */}
                    <Link
                        href="/admin/categorymanagment"
                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        <ArrowLeft size={20} /> Back
                    </Link>
                </div>

                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white shadow-md rounded-lg transition hover:scale-105">
                            <h3 className="font-bold">Total Events</h3>
                            <p className="text-2xl">{events.length}</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Event Management</h2>
                    <button
                        onClick={() => {
                            setSelectedEvent(event);
                            setIsEditing(true);
                        }}
                        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                    >
                        Add Event
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {events.map((event) => (
                            <div key={event._id || event.name} className="p-4 bg-white shadow-md rounded-lg relative">
                                <span
                                    className="absolute top-2 right-2 text-xl cursor-pointer"
                                    onClick={() => deleteEvent(event._id)}
                                >
                                    ❌
                                </span>
                                <h3 className="text-xl font-bold">{event.title}</h3>
                               

                                <Image
                                    src={event.image}
                                    alt="image"
                                    width={500}
                                    height={128} 
                                    className="w-full h-32 object-cover mt-2 rounded-md"
                                />

                                <p className="mt-2">
                                    <strong>Discription:</strong>{event.description}</p>
                                <p>
                                    <strong>Date:</strong> {event.date}
                                </p>
                                <p>
                                    <strong>Time:</strong> {event.time}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {event.endDate}
                                </p>
                                <p>
                                    <strong>End Time:</strong> {event.endTime}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p>
                                    <strong>Price:</strong> ₹.{event.price}
                                </p>
                                <p>
                                    <strong>Event AddDiscription:</strong> ${event.adddiscripition}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setIsEditing(true);
                                        }}
                                        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                                    >
                                        Edit
                                    </button>
                                    <Link
                                        href={`/admin/categorymanagment/add-events/${id}/add-ticket/${event._id}`}
                                        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                                    >
                                        Add Ticket
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Event Editing Form */}
                {isEditing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4">{selectedEvent.id ? "Edit Event" : "Add Event"}</h3>
                            <label className="block mb-2 font-semibold">Event Name:</label>
                            <input
                                type="text"
                                name="title"
                                value={selectedEvent.title || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, title: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Description:</label>
                            <textarea
                                name="description"
                                value={selectedEvent.description || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, description: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={selectedEvent.date || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, date: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={selectedEvent.time || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, time: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={selectedEvent.location || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, location: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={selectedEvent.price || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, price: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event EndDate:</label>
                            <input
                                type="date"
                                name="date"
                                value={selectedEvent.endDate || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, endDate: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event EndTime:</label>
                            <input
                                type="time"
                                name="time"
                                value={selectedEvent.endTime || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, endTime: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event AddDescription:</label>
                            <textarea
                                name="description"
                                value={selectedEvent.adddiscripition || ""}
                                onChange={(e) => {
                                    setSelectedEvent({ ...selectedEvent, adddiscripition: e.target.value });
                                }}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Event Image:</label>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => handleFileUpload(e)}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setSelectedEvent(null);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={selectedEvent && (selectedEvent._id || selectedEvent.id) ? updateEvent : saveEvent}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    {selectedEvent && (selectedEvent._id || selectedEvent.id) ? "Save Event" : "Add Event"}
                                </button>


                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddEvent;
