import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

const MyAnimation = () => {
  return (
    <div className="w-80 mx-auto">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default MyAnimation;
