"use client";
import React, { useState, useEffect } from "react";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/get-all-users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError("No users found");
      }
    } catch (error) {
      setError("Error fetching users");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 w-full min-w-[1000px] mx-auto">
     <h2 className="text-2xl font-bold mb-1 top-0 bg-white p-4 shadow-md z-10">
            User Management
          </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">User Type</th>
              <th className="px-4 py-3 text-left">Birthdate</th>
              <th className="px-4 py-3 text-left">Joined Date</th>
              <th className="px-4 py-3 text-left">Account Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-3 text-center">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-4 py-3 text-center text-red-500">{error}</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-3 text-center">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId} className="border-b">
                  <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">{user.userType}</td>
                  <td className="px-4 py-3">{user.birthDate}</td>
                  <td className="px-4 py-3">{user.joinedDate || "N/A"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${user.accountStatus === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                      {user.accountStatus || "N/A"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
