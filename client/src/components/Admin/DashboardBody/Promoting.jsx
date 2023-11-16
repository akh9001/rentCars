import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import shape from "../../../assets/shape2.png"

export default function Promoting(params) {
    return(
        
        <div className="flex border rounded-2xl bg-zinc-800 w-full">
            <div className="p-10 lg:w-[80%]">
                <h1 className="font-bold text-white text-4xl">Learn more about <span className="font-extralight italic">Promoting on Our Platform.</span></h1>
                <p className="text-white font-extralight mt-4">Discover the power of effective promotion on our platform. From targeted audience engagement and flexible budgets to detailed analytics and creative resources, we provide the tools and guidance you need for success.</p>
                <button className="font-bold text-white flex items-center mt-4 cursor-pointer">Explore more <BiRightArrowAlt /></button>
            </div>
            <img src={shape} alt="Shape" className="h-60 large:block small:hidden float-right rotate-12" />
        </div>
    );
};
