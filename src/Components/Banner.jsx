import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import image1 from "../assets/slider1.jpg";
import image2 from "../assets/slider2.jpg";
import image3 from "../assets/slider3.jpg";

const Banner = () => {
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
        <div>
          <img
            src={image1}
            alt="Banner 1"
            className="w-full h-48 sm:h-64 lg:h-[450px] object-cover rounded-xl"
          />
        </div>

        <div>
          <img
            src={image2}
            alt="Banner 2"
            className="w-full h-48 sm:h-64 lg:h-[450px] object-cover rounded-xl"
          />
        </div>

        <div>
          <img
            src={image3}
            alt="Banner 3"
            className="w-full h-48 sm:h-64 lg:h-[450px] object-cover rounded-xl"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

