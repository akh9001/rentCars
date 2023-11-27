import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import BrandsCard from "./Brands/BrandsCard";
import bmw from "../../../Assets/bmw.png"
import Mercedes from "../../../Assets/mercedes.png"
import Renault from "../../../Assets/renault.png"
import Porsh from "../../../Assets/porsh.png"


export default function BrandsSection(params) {
  return (
    <div className="bg-[#E6E6E6]">
    <div className=" large:px-36 px-4 py-12">
      <div className="flex justify-between p-3">
        <h1 className="text-center text-2xl font-bold">Brands</h1>
        <div className="flex items-center font-medium">
          See all <IoIosArrowForward size={20} color="#424242" />
        </div>
      </div>

      <div className="relative flex justify-start mt-3 space-x-3 items-center overflow-hidden m-auto">
      <div
              className="absolute right-0 top-0 bottom-0 w-1/12"
              style={{
                background:
                  "linear-gradient(to right, rgba(230, 230, 230, 0), rgba(230, 230, 230, 1))"
              }}
             
            ></div>
        <BrandsCard brandName="BMW" logoSrc={bmw} count={3} />
        <BrandsCard brandName="Renault" logoSrc={Renault} count={6} />
        <BrandsCard brandName="Mercedes" logoSrc={Mercedes} count={9} />
        <BrandsCard brandName="Porsh" logoSrc={Porsh} count={9} />
        <BrandsCard brandName="BMW" logoSrc={bmw} count={3} />
        <BrandsCard brandName="Renault" logoSrc={Renault} count={6} />
        <BrandsCard brandName="Mercedes" logoSrc={Mercedes} count={9} />
        <BrandsCard brandName="Porsh" logoSrc={Porsh} count={9} />
        <BrandsCard brandName="BMW" logoSrc={bmw} count={3} />
        <BrandsCard brandName="Renault" logoSrc={Renault} count={6} />
        <BrandsCard brandName="Mercedes" logoSrc={Mercedes} count={9} />
      </div>
      </div>
    </div>
  );
}
