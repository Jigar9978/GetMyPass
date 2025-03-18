"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

async function fetchEventData(name, title) {
    try {
        const res = await fetch(`/api/events/${name}/${title}`);
        if (!res.ok) {
            throw new Error(`Event not found: ${title}`);
        }

        const data = await res.json();
        console.log("Fetched Event Data:", data);
       

        if (!data.card.title || !data.card.date || !data.card.location || !Array.isArray(data.card.tickets)) {
            throw new Error("Invalid event data structure");
        }

        return data; // Ensure all necessary fields are present
    } catch (error) {
        console.error("Error fetching event data:", error);
        throw new Error("Failed to fetch event data");
    }
}


export default function TicketBooking({ params }) {
    const { name, id } = React.use(params); // Corrected destructure
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ticketCounts, setTicketCounts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getEventData = async () => {
            try {
                const data = await fetchEventData(name, id);

                if (data) {
                    setEventData(data); // Store full event data
                    setTicketCounts(data.tickets.map(() => 0)); // Initialize counts with 0
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setEventData(null);
                setLoading(false);
            }
        };

        if (name && id) {
            getEventData();
        }
    }, [name, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
                <style jsx>{`
                    .loader {
                        border: 8px solid #f3f3f3;
                        border-top: 8px solid #49225b;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (!eventData || !eventData.tickets || eventData.tickets.length === 0) {
        return <div>Event not found or no tickets available.</div>;
    }

    const { tickets } = eventData;

    const updateTicketCount = (cardId, increment, maxCount) => {
        const newTicketCounts = [...ticketCounts];
        let count = newTicketCounts[cardId];

        if (increment && count < Math.min(10, maxCount)) {
            newTicketCounts[cardId] = count + 1;
        } else if (!increment && count > 0) {
            newTicketCounts[cardId] = count - 1;
        }

        setTicketCounts(newTicketCounts);
    };

    const handleBookClick = () => {
        if (!eventData || !eventData.card) {
            console.error("Event data not loaded properly.");
            return;
        }    
        // Create tickets array with category, count, and price
        const ticketsData = ticketCounts.map((count, index) => {
          const ticket = tickets[index]; // Assuming tickets contain categories and prices
          if (count > 0) { // Only consider tickets where count > 0
            return {
              category: ticket.type, // e.g., "Gold", "Silver"
              count: count, // Number of tickets purchased
              price: ticket.price, // Price per ticket
            };
          }
          return null;
        }).filter(ticket => ticket !== null); // Filter out null values
      
        // Calculate total price based on ticket counts and prices
        const totalPrice = ticketsData.reduce((total, ticket) => {
          return total + ticket.count * ticket.price;
        }, 0);
      
        // Event details for query params
        const eventDataParams = {
            eventName: eventData?.card?.title || "Unknown Event",
            eventDate: eventData?.card?.date || "N/A",
            eventLocation: eventData?.card?.location || "Unknown Location",
            eventEnddate: eventData?.card?.endDate || "N/A",
            eventEndtime: eventData?.card?.endTime || "N/A",
            eventImage: eventData?.card?.image || "/default-image.jpg",
            eventTime: eventData?.card?.time || "N/A",
        };
        
          
        console.log(eventDataParams)
      
        // Convert tickets array to a JSON string for query params
        const queryParams = new URLSearchParams({
          tickets: JSON.stringify(ticketsData), // Pass tickets as a JSON string
          totalPrice: totalPrice,
          ...eventDataParams,
        }).toString();
      
        // Redirect to final price page with query params
        router.push(`/category/${name}/${id}/finalprice?${queryParams}`);
      };
      
      

    return (
        <div className="min-h-screen flex flex-col gap-8 items-center justify-center p-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-lg p-6 max-w-2xl w-full text-center transform hover:scale-105 transition-transform">
                <h1 className="text-4xl font-bold text-[#49225B] mb-2">Book Your Pass</h1>
                <p className="text-[#6E3482] text-lg">Select the number of passes (Maximum 10 per ticket)</p>
            </div>

            {tickets.map((ticket, idx) => (
                <div
                    key={idx}
                    className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full mb-4"
                >
                    <h3 className="text-xl font-bold text-[#49225B]">
                        {`${ticket.type} Ticket`}
                    </h3>
                    <p className="text-lg text-[#6E3482]">{ticket.description}</p>
                    <p className="text-lg text-[#49225B]">Price: ₹{ticket.price}</p>

                    {ticket.contity === 0 ? (
                        <p className="text-red-600 font-bold mt-4">Sold Out</p>
                    ) : (
                        <>
                            {ticket.contity <= 10 && ticket.contity > 0 && (
                                <p className="text-orange-500 font-bold mt-2">
                                    Last {ticket.contity} tickets left! Hurry up!
                                </p>
                            )}
                            <div className="flex items-center gap-4 mt-4">
                                <button
                                    className="bg-[#49225B] text-white px-4 py-2 rounded-full"
                                    onClick={() =>
                                        updateTicketCount(idx, true, ticket.contity)
                                    }
                                    disabled={ticketCounts[idx] >= Math.min(10, ticket.contity)}
                                >
                                    +1
                                </button>
                                <span>{ticketCounts[idx]}</span>
                                <button
                                    className="bg-[#49225B] text-white px-4 py-2 rounded-full"
                                    onClick={() =>
                                        updateTicketCount(idx, false, ticket.contity)
                                    }
                                    disabled={ticketCounts[idx] === 0}
                                >
                                    -1
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <button
                className={`bg-gradient-to-r from-[#49225B] to-[#A56ABD] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-[#49225B]/50 focus:outline-none transition-opacity duration-500 max-w-sm w-full ${
                    ticketCounts.reduce((sum, count) => sum + count, 0) > 0
                        ? "opacity-100"
                        : "opacity-0 hidden"
                }`}
                onClick={handleBookClick}
            >
                Continue
            </button>
        </div>
    );
}
