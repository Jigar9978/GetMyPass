import React from "react";
import ReviewSlider from "./Reviewslider";
import { FaStar } from 'react-icons/fa';

const Review = () => {
    return (
      <div className="pt-20 pb-20 flex items-center justify-center flex-col bg-purple-600 m-2 md:rounded-lg lg:rounded-full">
        <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Text Content */}
          <div>
            <h1 className="text-2xl font-semibold text-white">
              What our customers are saying us?
            </h1>
            <p className="mt-6 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              nesciunt fugiat praesentium dolores facilis delectus modi culpa
              aliquid deserunt ad!
            </p>
            
          {/* Ratings */}
          <div className="mt-6 flex items-center space-x-6">
            <div>
              <p className="text-2xl font-bold">4.88</p>
              <p className="text-white mb-2">overall rating</p>
              <div className="flex items-center">
                <FaStar className="text-white"/>
                <FaStar className="text-white"/>
                <FaStar className="text-white"/>
                <FaStar className="text-white"/>
                <FaStar className="text-white"/>
              </div>
            </div>
          </div>
        </div>
        {/* slider */}
        <div className="overflow-hidden">
          <ReviewSlider/>
        </div>
        </div>
      </div>
    );
};

export default Review;
