'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';


export default function EventSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [sliderName, setSliderName] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/slider');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setSlides(data.cards || []);
        setCards(data.cards || []);
        setSliderName(data.name || "default");
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }
  };
  
  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <style jsx>{`
          .loader {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .loader div {
            position: absolute;
            width: 16px;
            height: 16px;
            background: #4f46e5;
            border-radius: 50%;
            animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          }
          .loader div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .loader div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .loader div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes loader {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  if (slides.length === 0) {
    return <div>No images available to display</div>;
  }

  return (
    <div className="relative w-full h-[calc(100vh-40px)] md:h-[calc(100vh+60px)] overflow-hidden shadow-lg -mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.1, x: -50 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full"
        >
          {slides.length > 0 && slides[currentIndex] && (
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title || "Event Image"}
              layout="fill"
              objectFit="cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white p-6">
            <motion.h2
              className="text-4xl mt-72 md:text-6xl font-bold text-[#ffffff] drop-shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            <p className="text-lg md:text-2xl mt-2 text-[#f7bdbc] drop-shadow-md">
              {slides[currentIndex].description}
            </p>
            <Link href={`/category/${sliderName}/${cards[currentIndex]?.title}`}>
              <motion.button
                className="mt-4 px-6 py-3 bg-[#a355b8] text-white text-xl font-bold rounded-full shadow-md hover:bg-[#8b3a9f] transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Get Your Pass
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 p-2 rounded-full text-white" onClick={prevSlide}>
        <ChevronLeft size={30} />
      </button>
      {/* Right Arrow */}
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 p-2 rounded-full text-white" onClick={nextSlide}>
        <ChevronRight size={30} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#a355b8]' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
}