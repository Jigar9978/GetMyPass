'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Page Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 text-center shadow-md"
      >
        <h1 className="text-4xl font-extrabold tracking-wide">GetMyPass Privacy Policy</h1>
        <p className="text-lg mt-2 font-light">
          Your privacy is our top priority. Learn how we collect, use, and protect your data.
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-2xl rounded-lg"
      >
        <section className="mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-800 text-2xl font-bold mb-3 border-b-2 border-purple-500 pb-2"
          >
            Introduction
          </motion.h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to GetMyPass. We are committed to safeguarding your personal information. This Privacy Policy
            explains our data collection practices, usage, and security measures. By using our platform, you consent
            to these terms.
          </p>
        </section>

        <section className="mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-800 text-2xl font-bold mb-3 border-b-2 border-purple-500 pb-2"
          >
            Information We Collect
          </motion.h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Depending on your role in our platform, we collect different types of information to enhance your
            experience and ensure security.
          </p>
          <h3 className="text-purple-600 text-xl font-semibold mb-2">For Event Organizers:</h3>
          <ul className="list-disc list-inside text-gray-700 ml-6 space-y-2">
            <li>Event details, descriptions, and schedules.</li>
            <li>Custom pass elements such as logos, images, and themes.</li>
            <li>Contact details for communication purposes.</li>
            <li>Payment details securely processed by trusted partners.</li>
          </ul>
          <h3 className="text-purple-600 text-xl font-semibold mt-6 mb-2">For Attendees:</h3>
          <ul className="list-disc list-inside text-gray-700 ml-6 space-y-2">
            <li>Personal details like name, email, and phone number.</li>
            <li>Event attendance history and digital pass records.</li>
            <li>Securely handled payment details for purchases.</li>
            <li>Preferences for event notifications and updates.</li>
          </ul>
        </section>

        <section className="mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-800 text-2xl font-bold mb-3 border-b-2 border-purple-500 pb-2"
          >
            Data Retention
          </motion.h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your information for as long as necessary to provide services and comply with legal requirements.
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-6 mt-4 space-y-2">
            <li>Event-related data is stored until the event concludes and a limited period afterward.</li>
            <li>Payment details are processed through third-party services and are not stored permanently.</li>
            <li>Account-related information is retained until you choose to delete your account.</li>
          </ul>
        </section>
      </motion.div>
    </div>
  );
}
