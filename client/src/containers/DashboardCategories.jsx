import React from "react";
import LuxuryCar from "../Assets/LuxuryCar.jpg"
import SuvCar from "../Assets/SuvCar.jpg"
import ElectricCar from "../Assets/ElectricCar.jpg"


const carCallouts = [
  {
    name: 'Luxury Cars',
    description: 'Collection of luxury cars',
    imageSrc: LuxuryCar,
    imageAlt: 'Luxury Car',
    href: '#luxury',
  },
  {
    name: 'SUVs',
    description: 'Range of SUVs',
    imageSrc: SuvCar,
    imageAlt: 'SUV',
    href: '#suvs',
  },
  {
    name: 'Electric Vehicles',
    description: 'Go green with electric vehicles',
    imageSrc: ElectricCar,
    imageAlt: 'Electric Car',
    href: '#electric-vehicles',
  }
];

export default function CarAgency() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Car Collection</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {carCallouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative shadow-md h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
