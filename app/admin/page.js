"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and token check
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/adminlogin");
    } else {
      setLoading(false); // Token found, stop showing loader
    }
  }, [router]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Fancy loader animation */}
        <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        <style jsx>{`
          .loader {
            border-color: #4299e1 transparent #4299e1 transparent;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      Welcome GETMYPASS Admin Deskboard
    </div>
  );
};

export default AdminPage;
