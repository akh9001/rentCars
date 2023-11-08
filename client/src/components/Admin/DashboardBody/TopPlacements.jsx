import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import Car from "../../../Assets/iris 1.png";


export default function TopPlacements() {
            return(
        <div className="border rounded-2xl border-zinc-400 w-full grid grid-cols-6 grid-rows-7 gap-2 my-10 p-8">
            <div className="flex items-center justify-between col-span-6 row-span-1">
                <h1 className="font-bold py-4">Top placements</h1>
                <BiInfoCircle />
            </div>
            <div className="bg-zinc-100 justify-center items-center p-10 rounded-2xl col-span-6 row-span-3">
                <CiShare1 className="float-right cursor-pointer" />
                <img src={Car} alt="car" className="m-auto h-72" />
                <div>
                    <h1 className="font-bold text-2xl">S 500 Sedan</h1>
                    <p className="font-light text-lg">250 DH</p>
                </div>
            </div>
            <div className="bg-zinc-100 relative p-10 rounded-2xl col-span-3 row-span-3">
                <CiShare1 className=" float-right cursor-pointer" />
                <img src={Car} alt="car" className="h-22" />
                <div>
                    <h1 className="font-bold">S 500 Sedan</h1>
                    <p className="font-light text-xs">250 DH</p>
                </div>
            </div>
            <div className="bg-zinc-100 p-10 rounded-2xl col-span-3 row-span-3">
                <CiShare1 className="float-right cursor-pointer" />
                <img src={Car} alt="car" className="h-22" />
                <div>
                    <h1 className="font-bold">S 500 Sedan</h1>
                    <p className="font-light text-xs">250 DH</p>
                </div>
            </div>
        </div>

    );
};
