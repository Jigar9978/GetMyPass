"use client"
import React from 'react';
import ClientReviewForm from "./ClientReviewForm";
import { useState } from 'react';
import Image from 'next/image';
    
const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="relative bg-gradient-to-br from-[#2C1A35] to-[#A355B8] text-white">
      {/* Light Purple Section */}
      <div
        className="absolute inset-x-0 -top-8 mx-auto bg-gradient-to-br from-[#2C1A35] to-[#A355B8] py-3 px-6 rounded-md flex justify-between items-center w-11/12 md:w-3/4 lg:w-2/3 shadow-purple-200"
        style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.5)' }}
      >
        <p className="text-white font-semibold text-sm md:text-lg text-center w-full md:w-auto">
          Share your experience!
        </p>
        <button
        onClick={() => setIsOpen(true)} 
        className="bg-[#a355b8] text-white hover:scale-110 hover:shadow-lg hover:translate-y-[5px] px-4 py-2 font-extrabold z-30 rounded-full hover:bg-[#a355b8] transition text-sm md:text-base">
          Review Us
        </button>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20 mt-12 flex flex-col md:flex-row items-center md:items-start justify-evenly">
        {/* Left - Logo */}
        <div className="flex justify-center md:justify-start mb-8 md:mb-0">
          <Image width={500} height={128} src='/logo2.png' className='h-16 md:h-20 w-64' alt="Logo" />
        </div>

        {/* Right Section - Company, Further Info, Follow Us (Stacked on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-8 md:gap-16 text-center md:text-left">
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/about" className="hover:text-[#ffffff] hover:underline transition">About us</a></li>
              <li><a href="/contact" className="hover:text-[#ffffff] hover:underline transition">Contact us</a></li>
            </ul>
          </div>

          {/* Further Information */}
          <div>
            <h4 className="font-semibold text-white">Further Information</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/terms" className="hover:text-[#ffffff] hover:underline transition" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacypolicy" className="hover:text-[#ffffff] hover:underline transition" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-white">Follow us</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-[#ffffff] hover:underline transition">Instagram</a></li>
              <li><a href="#" className="hover:text-[#ffffff] hover:underline transition">Facebook</a></li>
            </ul>
          </div>
        </div>
        {isOpen && <ClientReviewForm onClose={() => setIsOpen(false)} />}
      </div>
      
    </footer>
  );
};

export default Footer;
