'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Popup from "../components/Popup";
import OTPLoginModal from "@/components/OTPLoginModal";
import UserAvatar from "../components/UserAvatar";
import { searchEvents } from "@/app/actions/searchEvents";
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const pathname = usePathname();
  const [bgStyle, setBgStyle] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("/n.jpg"); // User avatar image
  const [userName, setUserName] = useState("Hii,user");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const searchRef = useRef(null);

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/home') {
      setBgStyle({ backgroundImage: 'linear-gradient(to bottom right, #2C1A35, #A355B8)' });
    } else {
      setBgStyle({});
    }
  }, [pathname]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const data = await searchEvents(e.target.value);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false); // Close the modal if click is outside
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);



  useEffect(() => {
    // LocalStorage se data retrieve karna
    const storedLoginState = localStorage.getItem("isLoggedIn"); // Correct key
    const storedAvatar = localStorage.getItem("userAvatar");

    if (storedLoginState === "true") {
      setIsLoggedIn(true); // Login state true set karna
      setUserAvatar(storedAvatar || "/n.jpg"); // Avatar set karna
      fetchUserProfile(); // Fetch user profile data if logged in
    }
  }, [fetchUserProfile]);


  const fetchUserProfile = async () => {
    try {
      // Retrieve the phone number from the cookie
      const phoneNumber = getCookieValue("loggedInPhoneNumber");

      if (!phoneNumber) {
        console.error("No phone number found in cookies.");
        return;
      }

      const response = await fetch(`/api/get-profile?phoneNumber=${phoneNumber}`, {
        method: "GET",
      });

      const data = await response.json();


      if (data.success && data.profile) {
        // Access the profile details from the response
        const profileDetails = data.profile.profileDetails;

        if (profileDetails) {
          console.log("Profile details:", profileDetails); // Log profile details

          // Handle avatar and name
          const avatarPath = profileDetails.avatar
            ? `/uploads/${profileDetails.avatar.replace(/\s+/g, "%20")}`
            : "/n.jpg";

          setUserAvatar(avatarPath);
          setUserName(profileDetails.name || "User");
        }
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };


  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      if (cookie.startsWith(cookieName + "=")) {
        return decodeURIComponent(cookie.substring(cookieName.length + 1));
      }
    }
    return null;
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Login state ko update karna
    setUserAvatar("/n.jpg"); // Avatar set karna
    localStorage.setItem("isLoggedIn", "true"); // Login state ko save karna
    localStorage.setItem("userAvatar", "/n.jpg"); // Avatar ko save karna
  };

  const handleLogout = async () => {
    try {
      // Cookie से नंबर लाने की कोशिश करो
      const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
          if (cookie.startsWith(cookieName + "=")) {
            return decodeURIComponent(cookie.split("=")[1]);
          }
        }
        return null;
      };

      const phoneNumber = getCookieValue("loggedInPhoneNumber");

      // यदि phoneNumber नहीं है, फिर भी लॉगआउट करना है
      if (phoneNumber) {
        console.log("Phone number from cookie:", phoneNumber);

        // लॉगआउट API कॉल सिर्फ तभी करो जब फोन नंबर मिले
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            isLogin: false,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          console.error("Logout failed:", responseData.message || response.statusText);
        } else {
          console.log("Logout successful:", responseData.message);
        }
      } else {
        console.warn("No phone number found in cookies. Forcing logout...");
      }

      // Cookie हटाओ (भले ही मिले या न मिले)
      document.cookie = "loggedInPhoneNumber=; path=/; expires=" + new Date(0).toUTCString();
      console.log("Cookie 'loggedInPhoneNumber' has been removed.");

      // LocalStorage साफ करो
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userAvatar");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("rzp_device_id");
      localStorage.removeItem("rzp_checkout_anon_id");

      // State अपडेट करो
      setIsLoggedIn(false);
      setUserAvatar("/n.jpg");


      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };




  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Close modal on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div onClick={handleOutsideClick}>
        <nav
          className="absolute top-3 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[1110px] mx-auto flex items-center justify-between px-6 py-2 rounded-full shadow-lg transition-all duration-500"
          style={bgStyle}
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-indigo-500 pt-2">
              <Link href="/">
                <Image src="/logo2.png" alt="GETMYPASS" width={170} height={40} />
              </Link>
            </div>

            <div className="hidden md:flex text-white">
              <ul className="flex font-semibold">
                <li className="md:px-4 md:py-2 font-bold relative group">
                  <Link href="/" className="hover:text-[#a355b8] transition-transform duration-300 group-hover:scale-90">Home</Link>
                </li>
                <li className="md:px-4 md:py-2 font-bold relative group">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="hover:text-[#a355b8] transition-transform duration-300 group-hover:scale-90"
                  >
                    Search
                  </button>
                </li>
                <li className="md:px-4 md:py-2 font-bold relative group">
                  <Link href="/events" className="hover:text-[#a355b8] transition-transform duration-300 group-hover:scale-90">Events</Link>
                </li>
                <li className="md:px-4 md:py-2 font-bold relative group">
                  <Link href="/about" className="hover:text-[#a355b8] transition-transform duration-300 group-hover:scale-90">About</Link>
                </li>
                <li className="md:px-4 md:py-2 font-bold relative group">
                  <button onClick={openPopup} className="hover:text-[#a355b8] transition-transform duration-300 group-hover:scale-90">List Your Event</button>
                </li>
              </ul>
            </div>


            <div>
              {isLoggedIn ? (
                // Avatar for logged-in user
                <div
                  className="cursor-pointer hidden md:block"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <Image
                  width={500}
                  height={128}
                    src={userAvatar}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)} // Show Modal on click
                  className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300 flex items-center"
                >
                  <FaUser className="mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isLoggedIn ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image src={userAvatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover rounded-full" />
              </div>
            ) : isMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>



          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#2C1A35] text-white py-4 rounded-b-lg shadow-lg md:hidden">
              <ul className="flex flex-col items-center space-y-3">
                <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#a355b8] transition-transform duration-300">Home</Link></li>
                <li><button onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} className="hover:text-[#a355b8] transition-transform duration-300">Search</button></li>
                <li><Link href="/events" onClick={() => setIsMenuOpen(false)} className="hover:text-[#a355b8] transition-transform duration-300">Events</Link></li>
                <li><Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#a355b8] transition-transform duration-300">About</Link></li>
                <li><button onClick={() => { openPopup(); setIsMenuOpen(false); }} className="hover:text-[#a355b8] transition-transform duration-300">List Your Event</button></li>
              </ul>
              <div className="mt-4 flex justify-center">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-[#a355b8] text-white rounded-xl font-bold">Profile</Link>
                    <Link href="/tickets" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-[#a355b8] text-white rounded-xl font-bold">My Tickets</Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold">Logout</button>
                  </div>
                ) : (
                  <button onClick={() => { setShowModal(true); setIsMenuOpen(false); }} className="px-4 py-2 bg-[#a355b8] text-white rounded-xl font-bold">Login</button>
                )}
              </div>
            </div>
          )}

        </nav>
        <Popup isOpen={isPopupOpen} onClose={closePopup} />


        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-10 z-50">
            <div ref={searchRef} className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 relative">
              {/* ❌ Close Button */}
              <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>

              {/* 🔎 Search Input */}
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search events..."
                className="border p-2 rounded w-full"
              />

              <ul className="mt-3 max-h-60 overflow-y-auto bg-white shadow-md rounded-lg p-2">
                {results.length > 0 ? (
                  results.map((event, index) => {
                    console.log("Event Data:", event); // Debugging line: Check category and event title

                    return (
                      <li
                        key={index}
                        className="flex items-center gap-4 border-b last:border-none p-3 hover:bg-gray-100 transition duration-300 rounded-lg"
                      >
                        {/* Ensure category is not undefined */}
                        <Link
                          href={`/category/${encodeURIComponent(event.category || 'defaultCategory')}/${encodeURIComponent(event.title)}`}
                          className="flex items-center gap-4 w-full"
                        >
                          {/* Event Image */}
                          <Image
                          width={500}
                          height={128}
                            src={event.image || "/default-event.jpg"} // Default image fallback
                            alt="title"
                            className="w-16 h-16 object-cover rounded-md shadow-sm"
                          />

                          {/* Event Details */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-gray-500 text-center p-4">No results found</li>
                )}
              </ul>

            </div>
          </div>
        )}
        {/* OTP Login Modal */}
        {showModal && (
          <div onClick={handleOutsideClick}>
            <div ref={modalRef}>
              <OTPLoginModal closeModal={() => setShowModal(false)} handleLogin={handleLogin} />
            </div>
          </div>
        )}

        {isLoggedIn && (
          <UserAvatar
            userAvatar={userAvatar}
            userName={userName}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
          />
        )}

        <style jsx>{`
  @keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slideDown { animation: slideDown 0.4s ease-out; }
`}</style>
      </div>
    </>
  );
}
