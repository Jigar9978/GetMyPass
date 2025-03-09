"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { FaStar } from 'react-icons/fa';
import Image from "next/image";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="md:w-[450px] md:h-[350px] w-[90%] h-[300px]">
        {reviews.map((data) => {
          return (
            <SwiperSlide key={data._id} className="bg-white rounded-3xl block">
              <div className="w-[80%] mx-auto mt-16">
                <p className="text-xs sm:text-sm md:text-base font-semibold">
                  {data.description}
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(data.rating)].map((_, index) => (
                    <FaStar key={index} className="md:w-6 md:h-6 w-3 h-3 text-yellow-600"/>
                  ))}
                </div>
                <div className="mt-10">
                  <div className="flex items-center space-x-4">
                    <Image 
                      src="/logooo.jpg"
                      width={60}
                      height={60}
                      alt="Client"
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-semibold">{data.firstName} {data.lastName}</p>
                      <p className="text-gray-600 text-xs sm:text-base">{data.clientType}</p> {/* Yaha clientType use kiya hai */}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
