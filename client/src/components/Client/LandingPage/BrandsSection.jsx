import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function BrandsSection(params) {
    return(
        <div className="p-2">
            <div className="flex justify-between px-4">
                <h1 className="text-center text-2xl font-bold">Brands</h1>
                <div className="flex items-center font-medium">See all <IoIosArrowForward size={20}  color="#424242"/></div>
            </div>
        </div>
    );
};
