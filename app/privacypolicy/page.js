'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col justify-between">

      {/* Header */}
      <header className=" text-purple-600 py-10 text-center shadow-md">
        <motion.h1 
          className="text-4xl font-extrabold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p 
          className="text-lg mt-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Your privacy is important to us. Learn how we handle your data.
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto my-8 p-8 bg-white shadow-2xl rounded-2xl flex-grow space-y-10">

        {/* Section Animation Wrapper */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#4B0082] text-3xl mb-3 font-semibold">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome to GetMyPass. We are committed to safeguarding your personal information. This Privacy Policy explains our data collection practices, usage, and security measures. By using our platform, you consent to these terms.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h2 className="text-[#4B0082] text-3xl mb-3 font-semibold">Information We Collect</h2>
          <p className="text-gray-700 mb-4 text-lg">Depending on your role in our platform, we collect different types of information to enhance your experience and ensure security.</p>

          <h3 className="text-[#7E22CE] text-xl mb-2 font-medium">For Event Organizers:</h3>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Event details, descriptions, and schedules.</li>
            <li>Custom pass elements such as logos, images, and themes.</li>
            <li>Contact details for communication purposes.</li>
            <li>Payment details securely processed by trusted partners.</li>
          </ul>

          <h3 className="text-[#7E22CE] text-xl mt-5 mb-2 font-medium">For Attendees:</h3>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>Personal details like name, email, and phone number.</li>
            <li>Event attendance history and digital pass records.</li>
            <li>Securely handled payment details for purchases.</li>
            <li>Preferences for event notifications and updates.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-[#4B0082] text-3xl mb-3 font-semibold">Data Retention</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
            <li>We retain your information for as long as necessary to provide services and comply with legal requirements.</li>
            <li>Event-related data is stored until the event concludes and a limited period afterward.</li>
            <li>Payment details are processed through third-party services and are not stored permanently.</li>
            <li>Account-related information is retained until you choose to delete your account.</li>
          </ul>
        </motion.section>
      </main>

      <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-0"
            >
              <svg className="w-full h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                  fill="#581c87"
                  fillOpacity="0.2"
                  d="M0,192L80,197.3C160,203,320,213,480,202.7C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                ></path>
              </svg>
            </motion.div>
    </div>
  );
}
