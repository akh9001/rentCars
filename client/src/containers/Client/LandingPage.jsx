import { useState } from "react";
import Benefits from "../../components/Client/LandingPage/Benefits";
import BrandsSection from "../../components/Client/LandingPage/BrandsSection";
import HowWorks from "../../components/Client/LandingPage/HowWorks";
import PopularCars from "../../components/Client/LandingPage/PopularCars";
import TestimonialSlider from "../../components/Client/LandingPage/TestimonialSlider";
import WelcomeSection from "../../components/Client/LandingPage/WelcomeSection";
import NavBar from "../../components/Client/NavBar";

export default function LandingPage() {
    return(
        <div>
            <NavBar/>
            <WelcomeSection/>
            <BrandsSection/>
            <PopularCars/>
            <HowWorks/>
            <Benefits/>
            <TestimonialSlider/>
            
        </div>
        
        
    );
};
