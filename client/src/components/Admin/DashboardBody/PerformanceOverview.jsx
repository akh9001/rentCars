import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsBarChart, BsBoxSeam } from "react-icons/bs";


export default function PerformanceOverview() {
    return(

                <div className="border rounded-2xl border-zinc-400 w-full large:grid large:grid-cols-[1fr,1fr,1fr] large:gap-2 my-10 large:p-8 p-6">
                    <div className="my-4">
                        <p className="font-light">Since joined</p>
                        <h3 className="text-2xl font-bold">Performance Overview</h3>
                    </div>
                    <div className="bg-zinc-100 my-4 large:my-0 text-zinc-800 p-8 rounded-2xl">
                        <BiInfoCircle className="float-right text-zinc-500" />
                        <BsBarChart size={25} />
                        <p className="mt-2">Total Revenue</p>
                        <h2 className="font-bold text-4xl mt-4">125,24 DH</h2>
                    </div>
                    <div className="bg-zinc-100 text-zinc-800 p-8 rounded-2xl relative">
                        <BiInfoCircle className="float-right text-zinc-500" />
                        <BsBoxSeam size={25} />
                        <p className="mt-2">Total Items order</p>
                        <h2 className="font-bold text-4xl mt-4">2 676 </h2>
                    </div>
                </div>


    );
};
