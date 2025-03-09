"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactQRCode from 'react-qr-code';
import { motion } from 'framer-motion';

const generateBookingCode = () => {
  return "BOOK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullTicket, setShowFullTicket] = useState(false);
  const [expandedTickets, setExpandedTickets] = useState({});
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      description: "",
  });


  const togglePriceDetails = (ticketId) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId], // जिस टिकट पर क्लिक हुआ, बस वही टॉगल होगा
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              description: formData.description,
              rating,
              source: "user",
          }),
      });

      const textResponse = await response.text();
      console.log(textResponse);

      const result = textResponse ? JSON.parse(textResponse) : {};

      if (response.ok) {
          alert("Review Submitted Successfully!");

          // Reset form fields and rating
          setFormData({
              firstName: "",
              lastName: "",
              description: "",
          });
          setRating(0);
      } else {
          alert("Failed to submit review: " + (result.message || "Unknown error"));
      }
  } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the review.");
  }
};



  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Function to get cookie value by name
        const getCookieValue = (cookieName) => {
          const cookies = document.cookie.split("; ");
          for (let cookie of cookies) {
            if (cookie.startsWith(cookieName + "=")) {
              return decodeURIComponent(cookie.split("=")[1]);
            }
          }
          return null;
        };

        const loggedInPhoneNumber = getCookieValue("loggedInPhoneNumber");

        if (!loggedInPhoneNumber) {
          setError("User not logged in or phone number not found.");
          setLoading(false);
          return;
        }

        // Fetch tickets for the logged-in user
        const res = await fetch(`/api/get-my-tickets?userId=${loggedInPhoneNumber}`);
        const data = await res.json();

        if (data.success) {
          // Har ticket ke liye unique booking code generate karna
          const ticketsWithBookingCode = data.tickets.map((ticket) => ({
            ...ticket,
            bookingCode: generateBookingCode(),
          }));

          setTickets(ticketsWithBookingCode);
        } else {
          setError(data.error || "Failed to fetch tickets.");
        }
      } catch (err) {
        setError("An error occurred while fetching tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);





  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[495px] flex items-center justify-center p-4">
      {!showFullTicket ? (
        <div
          className="relative w-96 h-72 rounded-tl-[80px] rounded-br-[80px] shadow-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowFullTicket(true)}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="/videos/v-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <p className="text-white font-semibold tracking-wider text-center text-xs mt-20">Tap to view your exclusive ticket</p>
          </div>
        </div>
      ) : (
        <div>
            <div className="flex flex-col items-center justify-center text-center py-10 relative">
      {/* Background Text */}
      <motion.div
        initial={{ opacity: 0.2, y: 0 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute text-6xl md:text-8xl font-extrabold text-purple-300 uppercase tracking-widest select-none"
        style={{ letterSpacing: '0.1em', zIndex: 0 }}
      >
        GETMYPASS
      </motion.div>
      
      {/* Foreground Text */}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-4xl md:text-6xl font-bold text-purple-500 script-font"
        style={{ fontFamily: 'Dancing Script, cursive', fontWeight: '700' }}
      >
        My Tickets
      </motion.h1>
    </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="bg-purple-300 relative w-full max-w-sm rounded-3xl shadow-xl">
                <div className="right-curve"></div>
                <div className="left-curve"></div>
                <div id="ticket-content" className="relative p-4 rounded-3xl shadow-md overflow-hidden">
                  <h1 className="text-3xl font-bold text-center mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
                    𝐆𝐄𝐓𝐌𝐘𝐏𝐀𝐒𝐒
                  </h1>

                  <img src={ticket.eventImage} alt="Event Poster" className="object-cover w-full h-36 rounded-[20px] shadow-xl" />

                  <div className="mt-3 flex justify-between items-center px-6">
                    <h1 className="text-xl font-extrabold">{ticket.eventName}</h1>
                    <button onClick={() => handleDownload(ticket._id)} className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                      <FaDownload />
                    </button>
                  </div>

                  <div className="flex flex-col mt-4">
                    {/* Header labels */}
                    <div className="flex justify-between items-center px-8 mb-2">
                      <p className="text-xs font-light ml-4">Date</p>
                      <p className="text-xs font-light ml-1">Time</p>
                      <p className="text-xs font-light">Location</p>
                    </div>

                    {/* Data section */}
                    <div className="flex justify-between items-center">
                      {/* Date */}
                      <div className="flex flex-col items-center w-full">
                        <p className="text-sm font-medium">{ticket.eventDate}</p>
                      </div>

                      {/* Divider */}
                      <div className="w-1 h-4 border-r-2 border-dashed border-gray-600"></div>

                      {/* Time */}
                      <div className="flex flex-col items-center w-full">
                        <p className="text-sm font-medium">{ticket.eventTime}</p>
                      </div>

                      {/* Divider */}
                      <div className="w-1 h-4 border-r-2 border-dashed border-gray-600"></div>

                      {/* Location */}
                      <div className="flex flex-col items-center w-full">
                        <p className="text-sm font-medium">{ticket.eventLocation}</p>
                      </div>
                    </div>
                  </div>


                  <div className="relative mt-4">
                    <div className="border-t-2 border-dashed border-gray-600"></div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs font-light">Scan the QR Code to Print Your Tickets</p>
                    <div className="mt-3 flex justify-center">
                      <ReactQRCode
                        value={ticket.bookingCode}
                        size={100}
                        fgColor="#000000"
                        bgColor="#f8fafc"
                        level="L"
                      />
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      Booking Code: <span className="font-bold">{ticket.bookingCode}</span>
                    </p>
                  </div>


                  <div className="mt-4 relative">
                    <div
                      className="relative p-3 bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => togglePriceDetails(ticket._id)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Total Price:</p>
                        <p className="ml-32 md:ml-40">Rs. {ticket.tickets.reduce((total, t) => total + t.price * t.count, 0)}</p>
                        {expandedTickets[ticket._id] ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                  </div>

                </div>

                {expandedTickets[ticket._id] && (
                  <div
                    className="absolute bg-slate-200 left-0 top-[calc(92%+10px)] md:w-[343px] w-[327px] rounded-lg shadow-xl z-50 mt-2 p-2 ml-4"
                    style={{ zIndex: 99999 }}
                  >
                    {ticket.tickets.map((t, index) => (
                      <div key={index} className="flex justify-between">
                        <p className="text-sm">{t.category} ({t.count})</p>
                        <p className="text-sm">Rs.{t.price}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>
          <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6">
      {/* Review Form */}
      <div className="bg-purple-200 p-6 rounded-lg shadow-xl w-full md:w-auto flex">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 text-center">User Review</h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full text-gray-900"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full text-gray-900"
              />
            </div>
            <textarea
              name="description"
              placeholder="Review Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-4 h-24 text-gray-900"
            ></textarea>

            {/* Star Rating */}
            <div className="mt-4 flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4 transition-all"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-auto flex items-center ml-5">
          <img src="/i2.jpg" alt="Review Illustration" className="h-full max-h-96 rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
        </div>
      )}
      <style jsx>{`
        .right-curve {
          content: "";
          position: absolute;
          bottom: 233px;
          right: -20px;
          width: 42px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          z-index: 9999;
        }

        .left-curve {
          content: "";
          position: absolute;
          bottom: 233px;
          left: -20px;
          width: 42px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          z-index: 9999;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
