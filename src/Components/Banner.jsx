import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import image1 from "../assets/slider1.jpg";
import image2 from "../assets/slider2.jpg";
import image3 from "../assets/slider3.jpg";

const Banner = () => {
  const slidesText = [
    {
      title: "Learn Digital Life Skills",
      subtitle: "Upgrade your knowledge through real-world lessons.",
      btn: "Explore Lessons"
    },
    {
      title: "Create & Share Lessons",
      subtitle: "Share your knowledge with the world easily.",
      btn: "Start Creating"
    },
    {
      title: "Join a Smart Community",
      subtitle: "Connect, learn, and grow with global learners.",
      btn: "Join Now"
    },
  ];

  const images = [image1, image2, image3];

  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        stopOnHover={true}
        swipeable
        emulateTouch
        showArrows
        showIndicators
      >
        {images.map((img, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-48 sm:h-64 lg:h-[450px] object-cover rounded-xl"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl flex flex-col justify-end p-6 sm:p-10 text-white">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-2">
                {slidesText[index].title}
              </h2>

              <p className="text-sm sm:text-lg lg:text-xl mb-4 opacity-90">
                {slidesText[index].subtitle}
              </p>

              <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 w-fit transition">
                {slidesText[index].btn}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

