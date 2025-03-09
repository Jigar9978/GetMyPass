"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserAvatar = ({ userAvatar, userName,isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from localStorage on initial load
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true); // Set logged in status if true
    } else {
      setIsLoggedIn(false); // Ensure it's false if not logged in
    }
  }, []); // Only run once when the component is mounted

  // If user is not logged in, don't render the sidebar or avatar
  if (!isLoggedIn) {
    return null; // Or you can render a login prompt here
  }

  return (
    <>
      {/* Sidebar for Logged-In User */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 w-64 z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Image
            width={500}
            height={128}
              src={userAvatar}
              alt="User Avatar"
              className="h-12 w-12 rounded-full"
            />
            <span className="font-medium text-gray-700">{userName}</span>
          </div>
          <FaTimes
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <a href="/profile" className="text-gray-800 hover:text-purple-600">
                Profile
              </a>
            </li>
            <li>
              <a href="/tickets" className="text-gray-800 hover:text-purple-600">
                Tickets
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-purple-600">
                Help
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded-full w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar Background Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default UserAvatar;
