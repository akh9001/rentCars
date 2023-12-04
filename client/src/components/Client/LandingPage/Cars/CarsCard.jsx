import React from 'react';
import { RiWheelchairFill } from "react-icons/ri";
import { TbEngine, TbManualGearbox } from "react-icons/tb";

export default function CarsCard({ carImage, carModel, transmission, seats, fuelType }) {
    return (
        <div className="relative bg-white cursor-pointer duration-300 rounded-xl shadow-md p-6 my-16">
            <img src={carImage} alt={carModel} className="absolute h-36 bottom-36 right-1"/>
            <div className="mt-1">
                <h4 className="font-bold text-xl">{carModel}</h4>
                <div className="font-normal space-x-2 w-full text-sm text-zinc-800 my-8 flex items-center justify-center">
                    <p className="py-3 w-32 justify-center bg-slate-100 items-center rounded-full flex">
                        <TbManualGearbox className="mx-1 text-lg"/>{transmission}
                    </p> 
                    <p className="py-3 w-32 justify-center flex bg-slate-100 items-center rounded-full">
                        <RiWheelchairFill className="mx-1 text-lg"/>{seats} Seats
                    </p> 
                    <p className="py-3 w-32 justify-center flex items-center bg-slate-100 rounded-full">
                        <TbEngine className="mx-1 text-lg"/>{fuelType}
                    </p>
                </div>
                <div className="flex justify-center space-x-4 text-sm">
                    <button className="bg-black text-white p-2 rounded-lg w-28 hover:bg-zinc-700 duration-300">Rent Now</button>
                    <button className="border border-zinc-600 p-2 rounded-lg w-28 hover:bg-zinc-100">Details</button>
                </div>
            </div>
        </div>
    );
}
