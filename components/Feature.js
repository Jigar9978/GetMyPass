'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function HorizontalSlider() {
  const sliderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollInterval;

    if (slider) {
      scrollInterval = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        }
      }, 3000);
    }

    return () => clearInterval(scrollInterval);
  }, []);

  const cards = [
    {
      title: 'Pass Security',
      text: 'Every pass is equipped with a unique QR code generated using encrypted algorithms for maximum security.',
      img: '/image1.png',
      bg: ' bg-[#49243E]'
    },
    {
      title: 'Effortless Digital Passes',
      text: 'Streamlined digital passes provide a seamless and user-friendly experience for event organizers and attendees.',
      img: '/image2.png',
      bg: 'bg-[#704264]'
    },
    {
      title: 'Convenient Event Ticket',
      text: 'Tickets can be purchased within minutes through an intuitive online platform, removing the hassle of physical outlets.',
      img: '/image3.png',
      bg: 'bg-[#BB8493]'
    },
    {
      title: 'Custom Branding for Event Organizers',
      text: 'Personalized ticket designs with logos and themes for enhanced branding.',
      img: '/image4.png',
      bg: 'bg-[#DBAFA0]'
    }
  ];

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center md:min-h-screen py-12 px-4">
      
      {/* 🔹 Feature Heading */}
      <div className="text-center mb-8">
        
        <h3 className="text-3xl md:text-5xl font-bold text-[#a355b8] mt-2">Why Choose Us?</h3>
      </div>

      <div className="w-full max-w-5xl"> {/* ⬅️ Increased width */}
        <div
          ref={sliderRef}
          className="horizontal-slider flex gap-6 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 scroll-smooth"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex-shrink-0 group relative flex flex-row items-center justify-between h-60 md:h-56 w-full ${card.bg} text-white rounded-xl overflow-hidden transition-all duration-300 p-6 
                ${hoveredIndex !== null && hoveredIndex !== index && hoveredIndex % 2 !== index % 2 ? 'scale-90' : 'hover:h-64 hover:z-10'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold">{card.title}</h2>
                <p className="text-sm md:text-base mt-2">{card.text}</p>
              </div>
              <Image src={card.img} alt={card.title} width={120} height={120} className="w-24 h-24 md:w-28 md:h-28 group-hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
