import React from "react";
import CabrioletImage from "../Assets/Cabriolet.png";
import CamperVanImage from "../Assets/CamperVan.png";
import CoupeImage from "../Assets/Coupe.png";
import CUVImage from "../Assets/CUV.png";
import HatchbackImage from "../Assets/Hatchback.png";
import MicroImage from "../Assets/Micro.png";
import MiniVanImage from "../Assets/MiniVan.png";
import PickupImage from "../Assets/Pickup.png";
import RoadstarImage from "../Assets/Roadstar.png";
import SedanImage from "../Assets/Sedan.png";
import SupercarImage from "../Assets/Supercar.png";
import SUVImage from "../Assets/SUV.png";
import VanImage from "../Assets/Van.png";
import { AiOutlineArrowRight } from "react-icons/ai";

const carCallouts = [
  {
    name: 'Cabriolet',
    description: 'Description for Cabriolet.',
    imageSrc: CabrioletImage,
    imageAlt: 'Cabriolet',
    href: '#cabriolet',
  },
  {
    name: 'Camper Van',
    description: 'Description for Camper Van.',
    imageSrc: CamperVanImage,
    imageAlt: 'Camper Van',
    href: '#camper-van',
  },
  {
    name: 'Coupe',
    description: 'Description for Coupe.',
    imageSrc: CoupeImage,
    imageAlt: 'Coupe',
    href: '#coupe',
  },
  {
    name: 'CUV',
    description: 'Description for CUV.',
    imageSrc: CUVImage,
    imageAlt: 'CUV',
    href: '#cuv',
  },
  {
    name: 'Hatchback',
    description: 'Description for Hatchback.',
    imageSrc: HatchbackImage,
    imageAlt: 'Hatchback',
    href: '#hatchback',
  },
  {
    name: 'Micro',
    description: 'Description for Micro.',
    imageSrc: MicroImage,
    imageAlt: 'Micro',
    href: '#micro',
  },
  {
    name: 'MiniVan',
    description: 'Description for MiniVan.',
    imageSrc: MiniVanImage,
    imageAlt: 'MiniVan',
    href: '#minivan',
  },
  {
    name: 'Pickup',
    description: 'Description for Pickup.',
    imageSrc: PickupImage,
    imageAlt: 'Pickup',
    href: '#pickup',
  },
  {
    name: 'Roadstar',
    description: 'Description for Roadstar.',
    imageSrc: RoadstarImage,
    imageAlt: 'Roadstar',
    href: '#roadstar',
  },
  {
    name: 'Sedan',
    description: 'Description for Sedan.',
    imageSrc: SedanImage,
    imageAlt: 'Sedan',
    href: '#sedan',
  },
  {
    name: 'Supercar',
    description: 'Description for Supercar.',
    imageSrc: SupercarImage,
    imageAlt: 'Supercar',
    href: '#supercar',
  },
  {
    name: 'SUV',
    description: 'Description for SUV.',
    imageSrc: SUVImage,
    imageAlt: 'SUV',
    href: '#suv',
  },
  {
    name: 'Van',
    description: 'Description for Van.',
    imageSrc: VanImage,
    imageAlt: 'Van',
    href: '#van',
  }
];

export default function CarAgency() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 small:px-6 large:px-8 ">
        <div className="mx-auto max-w-2xl py-16 small:py-24 large:max-w-none large:py-32">
          <h2 className="text-3xl font-bold text-gray-900">Car Collection</h2>

          <div className="mt-6 grid grid-cols-1 small:grid-cols-1  md:grid-cols-3 large:grid-cols-3 gap-x-6 gap-y-12">
            {carCallouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative duration-300 cursor-pointer shadow-md hover:bg-zinc-100 h-60 small:h-72 p-16  rounded-xl w-full aspect-h-1 aspect-w-1 ">
              
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="large:w-50% small:mb-14 object-fit object-center"
                  />
                  <h3 className="absolute m-10 bg-white py-2 px-4 rounded-full top-36 small:top-44 text-xl flex justify-between items-center font-bold text-center text-black  inset-x-0 text-centerrounded-lg">
                  <a href={callout.href}>
                    {callout.name}
                  </a>
                  <div className="flex items-center text-gray-800 hover:text-white bg-white shadow-md hover:bg-black duration-300 border border-black rounded-full py-1 px-2 ">
                    <p className="text-xs mr-1">Explore</p>
                  <AiOutlineArrowRight size={15}/>
                  </div>
                </h3>
                </div>

                
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
