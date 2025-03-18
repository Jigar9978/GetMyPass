'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="relative bg-gradient-to-br min-h-screen font-sans overflow-hidden">

      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-50 z-0"></div>

      {/* Page Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-purple-700 py-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Terms and Conditions
        </motion.h1>
        <p className="text-lg mt-3 text-gray-700">
          By using GetMyPass services, you agree to the following terms and conditions.
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-100"
      >
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-purple-800 text-2xl font-semibold mb-6 border-b border-dashed border-purple-300 pb-2"
          >
            Client-Side Terms (Event Organizers)
          </motion.h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-6">
            {[
              'Provide accurate event details during the listing process.',
              'Update event details in a timely manner.',
              'Platform reserves the right to reject non-compliant events.',
              'Submission of the form does not guarantee approval.',
              'Clients can request customized passes with sufficient lead time.',
              'Additional fees may apply for custom designs or features.',
              'Provide all required assets in appropriate formats.',
              'Changes after design approval may incur extra charges.',
              'Event cancellation or rescheduling must be promptly communicated.',
              'Full payment is required before pass distribution.',
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="transition duration-300"
              >
                {item}
              </motion.li>
            ))}
          </ol>
        </section>

        <section>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-purple-800 from-gray-100 to-purple-50 text-2xl font-semibold mb-6 border-b border-dashed border-purple-300 pb-2"
          >
            Customer-Side Terms (Attendees)
          </motion.h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-6">
            {[
              'Digital passes are non-transferable unless specified.',
              'Refunds are subject to event organizer policies.',
              'Passes must be shown for entry at the venue.',
              "Entry disputes caused by scanning errors are not the platform's responsibility.",
              'User details are used strictly for event purposes.',
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="transition duration-300"
              >
                {item}
              </motion.li>
            ))}
          </ol>
        </section>
      </motion.div>

      {/* Decorative wave footer */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-0"
      >
        <svg className="w-full h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#7e22ce"
            fillOpacity="0.2"
            d="M0,192L80,197.3C160,203,320,213,480,202.7C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
}
