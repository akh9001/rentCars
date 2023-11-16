import React from "react";
import superCar from "../../../Assets/landingImage.jpg";
import FilterSearch from "./FilterSearch";
const WelcomeSection = () => {
  return (
    <div className="bg-black text-white large:py-16 py-16 text-center">
     <div className="relative z-30 text-5xl font-extrabold mb-8 p-8 rounded-md">
        <h1 className="large:mb-4 bg-gradient-to-b large:text-5xl text-2xl from-white to-zinc-400 bg-clip-text text-transparent">Discover Your Dream Ride</h1>
        <p className="large:text-2xl text-sm  font-light text-zinc-400 tracking-wide">
            Your One-Stop Car Rental Marketplace.
        </p>
        </div>

        <img
          className="w-full h-auto relative bottom-20"
          src={superCar}
          alt="Supercar"
          
        />

    <FilterSearch/>
    </div>
  );
};

export default WelcomeSection;
