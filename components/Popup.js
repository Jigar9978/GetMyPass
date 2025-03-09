"use client";

import React, { useState } from "react";

const Popup = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const eventData = { name, phone, email, category: selectedOption, people };
  
    try {
      const response = await fetch('/api/listevents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Event saved successfully!');
        onClose(); // Close the popup after saving
  
        // Reset fields after successful submission
        setName('');
        setPhone('');
        setEmail('');
        setSelectedOption('');
        setPeople('');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
  
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target.id === "popup-overlay") {
      onClose();
    }
  };

  return (
    <div
    id="popup-overlay"
    onClick={handleOverlayClick}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
  >
    <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-screen overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 font-bold text-xl p-2 rounded hover:bg-gray-300"
      >
        &#10005;
      </button>
  
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-600">List Your Event</h1>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your name"
            required
          />
        </div>
  
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your phone number"
            required
          />
        </div>
  
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Event Category:</label>
          <select
            id="category"
            value={selectedOption}
            onChange={handleChange}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="" disabled>Select category</option>
            <option value="music">Music</option>
            <option value="comedy">Comedy</option>
            <option value="festival">Festival</option>
            <option value="food-and-drinks">Food and Drinks</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="people" className="block text-sm font-medium text-gray-700">Number of People:</label>
          <input
            type="number"
            id="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter number of people"
            required
          />
        </div>
  
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="reset"
            className="bg-gray-500 text-white mr-4 px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Popup;
