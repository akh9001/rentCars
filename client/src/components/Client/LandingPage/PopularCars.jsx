import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import CarsCard from "./Cars/CarsCard";
import car1 from "../../../Assets/iris 1.png";
import car2 from "../../../Assets/iris-2.png";

export default function PopularCars() {
    const cars = [
        { carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },
        { carImage: car2, carModel: 'GLA 250 SUV', transmission: 'Automatic', seats: '7', fuelType: 'Diesel' },
        { carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },

    ];

    return (
        <div className="bg-[#E6E6E6]">
            <div className="px-36 py-12">
                <div className="relative flex justify-start mt-3 space-x-4 items-center overflow-hidden m-auto">
                <div
                    className="absolute z-10 right-0 top-0 bottom-0 w-1/12"
                    style={{
                        background:
                        "linear-gradient(to right, rgba(230, 230, 230, 0), rgba(230, 230, 230, 1))"
                    }}
                    
                    ></div>
                    {cars.map((car, index) => (
                        <CarsCard key={index} {...car} />
                    ))}
                </div>
            </div>
        </div>
    );
}
