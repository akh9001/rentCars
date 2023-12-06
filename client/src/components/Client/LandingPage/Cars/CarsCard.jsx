import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiWheelchairFill } from "react-icons/ri";
import { TbEngine, TbManualGearbox } from "react-icons/tb";

export default function CarsCard({ carImage, carModel, transmission, seats, fuelType, addToCartHandler }) {
    return (
        <div className="relative bg-white cursor-pointer duration-300 rounded-xl shadow-md p-6">
            <div className="mt-1">
            <img src={carImage} alt={carModel} className=" h-48 w-full object-cover mb-4 rounded-xl"/>
                <div className='flex justify-between px-3 py-2'>
                <h4 className="font-bold text-xl">{carModel}</h4>  
                <AiOutlineShoppingCart
                    size={25}
                    className="cursor-pointer hover:bg-slate-100 rounded-full"
                    color="#444"
                    title="Add to cart"
                    // onClick={() => addToCartHandler(data._id)}

                /> 
            </div>
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
                <div className="flex justify-end text-sm">
                    <button className="bg-black text-white mx-4 py-4 rounded-full w-full hover:bg-zinc-700 duration-300">Rent Now</button>
                </div>
            </div>
        </div>
    );
}
