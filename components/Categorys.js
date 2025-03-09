"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/events", { cache: "no-store" }); // Disable caching for fresh data
      const data = await res.json();
      setCategories(data); // Set categories fetched from API
      setLoaded(true); // Set loaded to true once data is fetched
    };
    fetchData();
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.name !== "slider" && category.name !== "popular"
  );

  return (
    <section className="text-white py-16 px-5 md:h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#a355b8]">- Popular Categories -</h2>
        <p className="mt-4 text-lg text-black">
          Our online event ticketing platform can be used to manage any kind of event in just about any category.
        </p>
      </div>

      {/* Desktop View - Grid Layout */}
      <div className="hidden md:flex justify-center gap-6 flex-wrap mt-14">
        {filteredCategories.map((category, index) => (
          <Link href={`/category/${category.name}`} key={category._id}>
            <div
              className={`relative w-48 md:w-56 h-72 rounded-2xl overflow-hidden shadow-lg 
            transform transition duration-500 ease-in-out 
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            hover:scale-110 hover:shadow-2xl`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold transition-all duration-300 hover:scale-110">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div ref={scrollRef} className="flex md:hidden overflow-x-auto space-x-6 scrollbar-hide px-4 mt-6">
        {filteredCategories.map((category, index) => (
          <Link href={`/category/${category.name}`} key={category._id}>
            <div className="relative min-w-[180px] h-72 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold transition-all duration-300 hover:scale-110">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
