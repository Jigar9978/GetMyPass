'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import React from 'react';

export default function FinalPrice() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventEnddate, setEventEnddate] = useState("");
  const [eventEndtime, setEventEndtime] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = searchParams.toString();
    if (queryParams) {
      const ticketsFromQuery = searchParams.get("tickets");
      const totalPriceFromQuery = searchParams.get("totalPrice");
      const eventNameFromQuery = searchParams.get("eventName");
      const eventDateFromQuery = searchParams.get("eventDate");
      const eventLocationFromQuery = searchParams.get("eventLocation");
      const eventEnddateFromQuery = searchParams.get("eventEnddate"); // New
      const eventEndtimeFromQuery = searchParams.get("eventEndtime"); // New
      const eventImageFromQuery = searchParams.get("eventImage"); // New
      const eventTimeFromQuery = searchParams.get("eventTime");
  
      let parsedTickets = [];
      if (ticketsFromQuery) {
        try {
          parsedTickets = JSON.parse(ticketsFromQuery);
        } catch (error) {
          console.error("Error parsing tickets data: ", error);
        }
      }
  
      setTickets(parsedTickets);
      setTotalPrice(totalPriceFromQuery);
      setEventName(eventNameFromQuery);
      setEventDate(eventDateFromQuery);
      setEventLocation(eventLocationFromQuery);
      setEventEnddate(eventEnddateFromQuery || "N/A"); // Default value
      setEventEndtime(eventEndtimeFromQuery || "N/A");
      setEventTime(eventTimeFromQuery || "N/A"); // Default value
      setEventImage(eventImageFromQuery || "/default-image.jpg"); // Default value
  
      setLoading(false);
    }
  }, [searchParams]);

  const handleCheckout = async () => {
    try {
      const userRes = await fetch('/api/get-logged-in-phone-number');
      const { phoneNumber } = await userRes.json();

      if (!phoneNumber) {
        console.error("No phone number found in cookies.");
        return;
      }

      const res = await fetch('/api/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount: totalPrice }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { orderId } = await res.json();

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        order_id: orderId,
        name: eventName,
        description: "Event Ticket Payment",
        image: "/i2.jpg",
        handler: async function (response) {
          try {
            const ticketRes = await fetch('/api/save-ticket', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: phoneNumber,
                eventName,
                eventDate,
                eventLocation,
                eventEnddate,
                eventEndtime,
                eventImage,
                eventTime,
                tickets,
                paymentId: response.razorpay_payment_id,
              }),
            });

            const data = await ticketRes.json();
            console.log("Ticket Saved:", data);
            if (!ticketRes.ok) {
              console.error("Error:", data.error);
              return;
            }

            console.log("Ticket Saved:", data.ticket);
            router.push(`/tickets`);
          } catch (error) {
            console.error("Failed to save ticket:", error);
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "Your Contact",
        },
        theme: {
          color: "#4a90e2",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center from-purple-100 to-indigo-50">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fade-in glass-card max-w-lg w-full rounded-lg p-8 shadow-lg bg-white bg-opacity-50 border border-white border-opacity-50"
    >
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-4">Booking Info</h1>
        <p className="text-lg text-purple-500">{eventName}</p>
      </div>
      {/* Event Details */}
      <div className="mt-6 space-y-4 text-purple-600">
        <div className="flex items-center">
          <span className="material-icons text-purple-400 mr-3">Event</span>
          <span>{eventDate}</span>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-purple-400 mr-3">location_on</span>
          <span>{eventLocation}</span>
        </div>
      </div>
      {/* Ticket Details */}
      <div className="mt-6 p-4 bg-purple-50 bg-opacity-70 rounded-lg text-purple-700 border-2 border-purple-300">
      {tickets
            .filter((ticket) => ticket.count > 0)
            .map((ticket, idx) => (
        <div key={idx} className="flex justify-between">
          <span className="font-semibold">{`${ticket.category} Ticket (${ticket.count})`}</span>
          <span>₹{ticket.count * ticket.price}</span>
        </div>
           ))}
      </div>
      {/* Total Amount */}
      <div className="mt-4 text-lg font-bold text-purple-600 flex justify-between">
        <span>Total Amount</span>
        <span>₹{totalPrice}</span>
      </div>
      {/* Checkout Button */}
      <div className="mt-6">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckout}
          className="glow-btn w-full py-3 rounded-md bg-purple-500 text-white font-semibold text-lg hover:bg-purple-600 transition"
        >
          Checkout
        </motion.button>
      </div>
      {/* Additional Information */}
      <div className="mt-6 text-sm text-purple-500 space-y-3">
        <div className="p-3 bg-purple-50 bg-opacity-70 rounded-md border border-purple-200">
          <strong>E-Tickets for Eco-Friendly Travel:</strong> Go Green with E-Tickets! Save paper and the environment.
        </div>
        <div className="p-3 bg-purple-50 bg-opacity-70 rounded-md border border-purple-200">
          <strong>QR Code Entry:</strong> Show the emailed QR code for hassle-free access.
        </div>
        <div className="p-3 bg-purple-50 bg-opacity-70 rounded-md border border-purple-200">
          <strong>Manage Your Tickets:</strong> Access all your purchased tickets in the 'My Tickets' section.
        </div>
      </div>
    </motion.div>
  </div>
  );
}
