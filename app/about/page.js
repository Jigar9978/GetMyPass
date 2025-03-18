'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Jigar',
    role: 'Back-End Developer',
    text: 'Jigar focused on developing the back-end of the website, creating a seamless and fast user experience with robust server-side operations and data management.',
    image: '/Jigar.jpg',
  },
  {
    name: 'Prinsi',
    role: 'Web Developer',
    text: 'Prinsi was responsible for crafting the front-end of the website with a unique, interactive user experience that ensures smooth navigation and aesthetic appeal.',
    image: '/prinsi.jpg',
  },
  {
    name: 'Krisha',
    role: 'UI/UX Designer',
    text: 'Krisha designed the stunning and functional user interface, ensuring the website’s design was intuitive, responsive, and visually engaging across all devices.',
    image: '/Krisha.jpg',
  },
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-gray-50'>
      {/* Hero Section */}
      <section className="relative h-[500px] md:min-h-screen flex items-center justify-center px-1 sm:px-8">
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative text-white text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-purple-900 mb-6 sm:mb-10">About Us</h1>
          <h1 className="text-2xl sm:text-4xl font-bold text-purple-800">Meet Our Founders</h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-purple-800">The minds behind GetMyPass</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            {["Jigar Gavle", "Prinsi Pujara", "Krisha Shah"].map((name, index) => (
              <div key={index}>
                <h2 className="text-xl sm:text-2xl font-semibold text-purple-800">{name}</h2>
                <p className="text-sm text-purple-800">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-purple-100">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">About GetMyPass</h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        GetMyPass is a <strong>revolutionary digital marketplace</strong> that allows users to <strong>seamlessly buy and sell event passes</strong>.
                        Whether you’re an organizer looking to reach a <strong>wider audience</strong> or an attendee searching for the <strong>best ticketing options</strong>,
                        we provide a <strong>secure, transparent, and hassle-free</strong> experience.
                        <br /><br />
                        Our platform ensures <strong>real-time availability</strong> of passes for <strong>concerts, sports events, festivals, and conferences</strong>,
                        eliminating the inconvenience of last-minute searches. With our <strong>intuitive interface</strong>,
                        buyers can effortlessly discover, compare, and purchase event passes, while sellers benefit from
                        a <strong>streamlined listing process</strong> with <strong>zero hidden fees</strong>.
                        <br /><br />
                        Backed by <strong>secure transactions</strong>, <strong>instant confirmations</strong>, and <strong>24/7 customer support</strong>,
                        GetMyPass is redefining how event-goers connect with live experiences. Whether you’re looking to <strong>secure your next big event pass</strong>
                        or <strong>resell an extra ticket</strong>, GetMyPass is your ultimate <strong>ticketing solution</strong>.
                    </p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="min-h-screen flex items-center justify-center bg-purple-200 px-6 py-16">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">What We Use</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: 'Payment Methods', description: 'Razorpay', icon: '💳' },
              { title: 'Tech Stack', description: 'Next.js, Tailwind CSS', icon: '💻' },
              { title: 'Database', description: 'MongoDB', icon: '🗄' },
              { title: 'Customer Support', description: '24/7 Live Chat & Email', icon: '🎧' },
              { title: 'Event Types', description: 'Concerts, Festivals', icon: '🎫' },
              { title: 'User-Friendly', description: 'Easy Checkout & Intuitive UI', icon: '📱' }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-primary hover:text-white">
                <span className="text-4xl sm:text-5xl">{item.icon}</span>
                <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                <p className="text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full my-24 mx-auto max-w-5xl p-6 bg-purple-100 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">Our Team</h2>
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].name}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute flex flex-col sm:flex-row items-center justify-center w-full"
            >
              <div className="w-full sm:w-1/2 p-6 bg-white bg-opacity-60 backdrop-blur-md shadow-2xl rounded-lg text-center sm:text-left">
                <p className="text-gray-700">{testimonials[currentIndex].text}</p>
                <h3 className="font-semibold text-lg mt-4">{testimonials[currentIndex].name}</h3>
                <p className="text-gray-500">{testimonials[currentIndex].role}</p>
              </div>
              <div className="w-40 sm:w-60 h-52 sm:h-72 relative">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-2xl object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
         {/* Features Section */}
         <section className="bg-purple-300 text-white min-h-screen flex items-center justify-center p-5">
                <div className="max-w-5xl w-full">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center">GetMyPass Features</h1>
                    <p className="mt-6 text-lg text-center">Explore the powerful features that make GetMyPass the best event ticketing platform.</p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            '🎭 Multiple Event Categories',
                            '🎟 Ticket Types',
                            '📊 Sales Analytics',
                            '🛠 Admin Panel Access',
                            '🔑 OTP Login',
                            '⭐ User Reviews',
                            '💰 No Hidden Fees',
                            '🛒 Easy Pass Purchase',
                        ].map((feature, index) => (
                            <div key={index} className="bg-white text-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                                <h2 className="text-xl font-bold text-purple-600">{feature}</h2>
                            </div>
                        ))}
                        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center sm:col-span-2 text-xl">
                            <h2 className="text-3xl font-bold text-purple-600">📱 Fully Responsive</h2>
                            <p className="mt-4">Optimized for desktops, tablets, and mobile devices, ensuring a smooth user experience.</p>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  );
}