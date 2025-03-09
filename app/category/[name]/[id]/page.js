"use client";
import React, { useState, useEffect } from "react";
import OtpLoginModal from "@/components/OTPLoginModal";
import UserAvatar from "@/components/UserAvatar"; // Import the UserAvatar component

export default function CardDetailsPage({ params }) {
  const { id, name } = React.use(params); // Get id and name from params
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null); // State to store the user avatar

  const closeModal = () => {
    setShowLoginModal(false);
  };

  // Define the login handler (this could be setting state, redirecting, etc.)
  const handleLogin = () => {
    console.log("User successfully logged in!");
    setIsLoggedIn(true); // Set logged in state to true
    setUserAvatar("/path/to/avatar.jpg"); // Update the avatar (example image path)
    setShowLoginModal(false);  // Close modal after successful login
  };

  const toggleMoreContent = () => {
    setShowMoreContent(!showMoreContent);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Decode the URL-encoded ID
  const decodedId = decodeURIComponent(id);

  // ID ke aadhar par card dhundhein
  useEffect(() => {
    if (!decodedId) {
      setError("Event ID is missing!");
      setLoading(false);
      return;
    }

    async function fetchCardData() {
      try {
        const response = await fetch(`/api/events?id=${decodedId}`);
        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No events found for the given ID.");
        }

        // Search through the categories and their cards
        const foundCard = data
          .map((category) => category.cards) // Assuming category contains a "cards" array
          .flat() // Flatten the nested arrays of cards
          .find((item) => {
            // Log the entire item to inspect its structure
            console.log("Card item structure:", item);

            // Check if the ID exists and compare
            if (item && item.title) {
              console.log("Comparing:", item.title, "with", decodedId);
              return String(item.title) === String(decodedId);
            }
            return false;
          });
        // Debugging: Log the found card
        console.log("Found Card:", foundCard);

        if (foundCard) {
          setCard(foundCard);
        } else {
          setError("Card not found");
          console.log("Card not found for ID:", decodedId);
        }
      } catch (err) {
        setError("Failed to fetch card data");
        console.error(err); // Log error for debugging
      } finally {
        setLoading(false);
      }
    }

    fetchCardData();
  }, [decodedId]);

  if (loading) {
    return (
      <div className="loading-screen bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="loading-animation">
          <div className="ticket-icon">🎟️</div>
          <div className="loading-text">Loading your event...</div>
        </div>
        <style jsx>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #f7f5f5;
          }
          .loading-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .ticket-icon {
            font-size: 4rem;
            animation: bounce 1.5s infinite;
          }
          .loading-text {
            margin-top: 1rem;
            font-size: 1.5rem;
            color: #6b46c1;
            font-weight: bold;
            animation: fade 1.5s infinite;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes fade {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleBookNow = async () => {
    try {
      // Check if user is logged in using localStorage
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Retrieve login status from localStorage
  
      // If the user is not logged in, show the login modal and prevent further action
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return; // Stop further execution if not logged in
      }
  
      // Include the isLoggedIn value in the API request headers
      const response = await fetch("/api/check-login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Local-Login-Status": isLoggedIn.toString(), // Send the login status as a header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Check if the user is logged in (either from API or localStorage)
        if (data.loggedIn || isLoggedIn) {
          // If logged in, proceed to the booking page
          window.location.href = `/category/${params.name}/${params.id}/typepass`;
        } else {
          // If not logged in, show the login modal
          setShowLoginModal(true);
        }
      } else {
        // If the response is not okay (e.g., 401), show the login modal
        setShowLoginModal(true);
      }
    } catch (error) {
      console.warn("Error checking login status:", error);
      // Always show the login modal in case of an error
      setShowLoginModal(true);
    }
  };
  
  
  

  return (
    <div className="min-h-screen">
      {/* Event Image */}
      <img
        src={card.image}
        alt="Event"
        className="animate-fadeInUp shadow rounded-lg overflow-hidden border w-[800px] h-[400px] transform transition-transform duration-300 hover:scale-105 mx-auto"
      />

      {/* Event Content */}
      <div className="max-w-3xl mx-auto p-6">
        {/* Event Title */}
        <h1 className="text-3xl font-bold text-gray-800 p-6 bg-white shadow-lg rounded-md max-w-full mx-auto animate-fadeInUp">
          {card.title}
        </h1>


        {/* Event Details */}
        <div className="mb-4 mt-4 text-gray-600 font-bold p-6 bg-white shadow-lg rounded-md max-w-full mx-auto animate-fadeInUp">
          <p className="flex items-center space-x-2">
            <span>Sun, {card.date} at {card.time} </span>
          </p>
          <p className="flex items-center space-x-1 mt-1">
            <span>{card.location}</span>
          </p>
        </div>

        {/* Why You Should Attend Section */}
        <div className="p-6 bg-white shadow-lg rounded-md max-w-full mx-auto animate-fadeInUp">
          <h2 className="text-2xl font-bold flex items-center mb-6">
            <span className="mr-2">🌟</span> Why you should attend?
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-yellow-500">•</span>
              <p>
                <span className="font-semibold">Live Performances</span> – Top 5+ artists lighting up the stage.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-yellow-500">•</span>
              <p>
                <span className="font-semibold">Social Connections</span> – Meet fans, artists, and new friends.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-yellow-500">•</span>
              <p>
                <span className="font-semibold">Exclusive Showmates Perks</span> – Special surprises for Showmates attendees.
              </p>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div className="mt-6 font-bold p-6 bg-white shadow-lg rounded-md max-w-full mx-auto animate-fadeInUp">
          <h2 className="text-lg font-semibold text-gray-800">About the Event</h2>
          <p className="text-gray-600 mt-2">
            🌟 <span className="font-bold">Meet Bigfett</span> 🌟
          </p>

          <div>
            <p className="text-gray-700">
              {card.description}
            </p>

            {showMoreContent && (
              <p className="text-gray-700 mt-2">
                {card.adddiscripition}
              </p>
            )}

            <button
              onClick={toggleMoreContent}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none hover:underline"
            >
              {showMoreContent ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div>
            <button
              onClick={toggleDropdown}
              className="text-blue-600 hover:text-blue-800 font-medium mt-1 rounded-md focus:outline-none hover:underline"
            >
              Terms & Conditions
            </button>
            {showDropdown && (
              <div className="mt-4 bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm space-y-2">
                <p>1. Tickets once booked cannot be exchanged or refunded.</p>
                <p>2. An Internet handling fee per ticket may be levied. Please check the total amount before payment.</p>
                <p>3. We recommend that you arrive at least 30 minutes prior to the venue for seamless entry.</p>
                <p>4. It is mandatory to wear masks at all times and follow social distancing norms.</p>
                <p>5. Please do not purchase tickets if you feel sick.</p>
                <p>6. Unlawful resale (or attempted unlawful resale) of a ticket would lead to seizure or cancellation without refund or other compensation.</p>
                <p>7. Rights of admission reserved.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Price and Book Pass Button */}
      <div className="fixed bottom-0 left-0 w-full bg-purple-800 text-white flex justify-between items-center px-6 py-2">
        <div className="text-lg font-semibold">₹ {card.price} onwards</div>
        
        <button onClick={handleBookNow} className="book-pass-btn bg-white text-purple-800 border-2 border-purple-800 px-6 py-2 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:bg-purple-800 hover:text-white">
            BOOK PASS
          </button>
        
  
      </div>
     
        {/* Show Avatar if logged in */}
        {isLoggedIn && userAvatar && (
          <UserAvatar userAvatar={userAvatar} />
        )}

        {/* OtpLoginModal */}
        {showLoginModal && (
           <OtpLoginModal closeModal={closeModal} handleLogin={handleLogin} />
        )}
       
      

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        
        .book-pass-btn {
          background-color: white;
          color: #6b46c1;
          border: 2px solid #6b46c1;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 600;
        }

        .book-pass-btn:hover {
          background-color: #6b46c1;
          color: white;
          transform: scale(1.1);
        }

        .fixed {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
