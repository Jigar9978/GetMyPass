"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ClientReviewForm({ onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        description: "",
    });

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
                    source: "client", // Ensure this form submits as "client"
                }),
            });

            const textResponse = await response.text();
            console.log(textResponse);

            const result = textResponse ? JSON.parse(textResponse) : {};

            if (response.ok) {
                alert("Review Submitted Successfully!");
                onClose();
            } else {
                alert("Failed to submit review: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the review.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 w-[90%] max-w-lg relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-center text-[#A355B8] mb-4">
                    Client Review Form
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A355B8] text-gray-900"
                    />

                    {/* Last Name */}
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A355B8] text-gray-900"
                    />

                    {/* Description */}
                    <motion.textarea
                        whileFocus={{ scale: 1.05 }}
                        name="description"
                        placeholder="Write your review..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A355B8] text-gray-900"
                    />

                    {/* Star Rating */}
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                type="button"
                                className="text-yellow-400 focus:outline-none"
                            >
                                <Star
                                    size={30}
                                    fill={star <= (hoverRating || rating) ? "#FFD700" : "none"}
                                    stroke="currentColor"
                                />
                            </motion.button>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-purple-700 text-white py-2 rounded-lg font-bold shadow-md transition-all"
                    >
                        Submit Review
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
