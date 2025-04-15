"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OTPLoginModal({ closeModal, handleLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState(""); // Local OTP
  const [step, setStep] = useState(1); // Step 1 for phone number, Step 2 for OTP

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^\+\d{10,15}$/; // Validates international format
    return phoneRegex.test(number);
  };

  const sendOTP = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("कृपया सही फोन नंबर डालें।");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000); // Random OTP
    setGeneratedOTP(otpCode); // Store locally for display purpose

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message); // OTP successfully sent
        setStep(2); // Move to OTP verification step
      } else {
        toast.error("OTP भेजने में समस्या आई।");
      }
    } catch (error) {
      console.error("OTP भेजने में त्रुटि:", error);
      toast.error("OTP भेजने में त्रुटि हुई।");
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      toast.error("कृपया OTP डालें।");
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("फोन नंबर सफलतापूर्वक सत्यापित हो गया!");
        
        // OTP verification successful, save login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("phoneNumber", phoneNumber);

        handleLogin(); // Call handleLogin to log in
        closeModal(); // Close modal on success
      } else {
        toast.error(data.message || "OTP सत्यापन में विफलता।");
      }
    } catch (error) {
      console.error("OTP सत्यापन में त्रुटि:", error);
      toast.error("OTP सत्यापन में त्रुटि हुई।");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal(); // Close modal if clicked outside the modal content
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOutsideClick}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md relative z-60"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">OTP Login</h2>

        {step === 1 && (
          <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-blue-600 text-center">Enter Your Phone Number</h2>
          
          <input
            type="text"
            placeholder="Enter phone number (+123456789)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        
          <div className="flex justify-between mt-4">
            <button
              onClick={closeModal}
              className="text-red-500 font-semibold hover:underline transition"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: isValidPhoneNumber(phoneNumber) ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendOTP}
              disabled={!isValidPhoneNumber(phoneNumber)}
              className={`px-6 py-2 rounded-lg font-medium transition duration-300 ${
                isValidPhoneNumber(phoneNumber)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Send OTP
            </motion.button>
          </div>
        </motion.div>
        )}

        {step === 2 && (
          <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-green-600 text-center">Verify OTP</h2>
          
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 text-black border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        
          <div className="flex justify-between mt-4">
            <button
              onClick={closeModal}
              className="text-red-500 font-semibold hover:underline transition"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={verifyOTP}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Verify OTP
            </motion.button>
          </div>
        </motion.div>
        
        )}
      </motion.div>

      <ToastContainer />
    </motion.div>
  );
}
