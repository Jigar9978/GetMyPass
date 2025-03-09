'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Page Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-800 text-white p-6 text-center"
      >
        <h1 className="text-3xl font-semibold">Terms and Conditions</h1>
        <p className="text-lg mt-2">
          By using GetMyPass services, you agree to the following terms and conditions.
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg"
      >
        <section className="mb-10">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-800 text-2xl font-semibold mb-4"
          >
            Client-Side Terms (Event Organizers)
          </motion.h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-6">
            <li>Provide accurate event details during the listing process.</li>
            <li>Update event details in a timely manner.</li>
            <li>Platform reserves the right to reject non-compliant events.</li>
            <li>Submission of the form does not guarantee approval.</li>
            <li>Clients can request customized passes with sufficient lead time.</li>
            <li>Additional fees may apply for custom designs or features.</li>
            <li>Provide all required assets in appropriate formats.</li>
            <li>Changes after design approval may incur extra charges.</li>
            <li>Event cancellation or rescheduling must be promptly communicated.</li>
            <li>Full payment is required before pass distribution.</li>
          </ol>
        </section>

        <section>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-800 text-2xl font-semibold mb-4"
          >
            Customer-Side Terms (Attendees)
          </motion.h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-6">
            <li>Digital passes are non-transferable unless specified.</li>
            <li>Refunds are subject to event organizer policies.</li>
            <li>Passes must be shown for entry at the venue.</li>
            <li>Entry disputes caused by scanning errors are not the platform&apos;s responsibility.</li>
            <li>User details are used strictly for event purposes.</li>
          </ol>
        </section>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-800 text-white py-4 text-center"
      >
        <p>&copy; 2024 GetMyPass. All Rights Reserved.</p>
      </motion.footer>
    </div>
  );
}
