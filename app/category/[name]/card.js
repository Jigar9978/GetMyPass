"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

const Popular = () => {
  const swiperRef = useRef(null);
  const [cards, setCards] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/popular");
        const data = await res.json();
        console.log(data);
        setCards(data.cards || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchCards();
  }, []);

  // Initialize Swiper once cards are set
  useEffect(() => {
    if (cards.length === 0) return;  // Only initialize swiper if there are cards

    // Initialize Swiper only once
    if (swiperRef.current) return;

    swiperRef.current = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,  // Infinite loop
      autoplay: {
        delay: 3000, // Slide every 3 seconds
        disableOnInteraction: false, // Even after clicking, it should keep auto-sliding
      },
      speed: 1000, // Smooth transition speed (1s)
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
    });
  }, [cards]);  // Re-run whenever the cards state changes

  return (
    <div className="flex flex-col justify-center items-center md:h-screen h-[650px] bg-[#f5f5f5]">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-[#a355b8] font-bold">- Popular Events -</h2>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">Trending Events</h1>
      </div>

      {/* Swiper Slider */}
      <div className="swiper w-5/6 h-[450px] relative">
        <div className="swiper-wrapper">
          {cards.map((card, index) => (
            <div
              key={index}
              className="swiper-slide relative group rounded-2xl overflow-hidden shadow-lg transform snap-center flex-shrink-0"
              style={{
                width: "300px",
                height: "400px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "15px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 rounded-t-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
                <h6 className="text-xs text-gray-300">{card.date}</h6>
                <h4 className="text-lg font-semibold">{card.title}</h4>
                <h5 className="text-sm text-gray-400">{card.location}</h5>
                <p className="text-md font-bold mt-1">₹{card.price}</p>
                <Link href={`/category/popular/${encodeURIComponent(card.title)}`}>
                <button className="mt-2 px-6 py-2 bg-[#a355b8] text-white font-semibold rounded-full transition duration-300 w-full">
                  Buy Now
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="swiper-pagination"></div>

        {/* Navigation Buttons */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>

      {/* Custom Styles for Purple-500 and Hover Effect */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #9333ea !important; /* Purple-500 */
        }
        .swiper-pagination-bullet {
          background-color: #9333ea !important; /* Purple-500 */
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background-color: #9333ea !important; /* Purple-500 */
          opacity: 1;
          transform: scale(1.2);
        }

        /* Hover effect for laptops and larger screens only */
        @media (min-width: 768px) {
          .swiper-slide .group:hover .swiper-slide > div {
            opacity: 100;
          }
        }

        /* For mobile and smaller screens, show details always */
        @media (max-width: 767px) {
          .swiper-slide .swiper-slide > div {
            opacity: 100;
          }
        }
      `}</style>
    </div>
  );
};

export default Popular;
