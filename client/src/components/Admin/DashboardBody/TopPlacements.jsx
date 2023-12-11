import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import Car from "../../../assets/iris 1.png";

export default function TopPlacements() {
  const carData = [
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
      name: "S 500 Sedan",
      price: "250 DH",
    },
    {
        name: "S 500 Sedan",
        price: "250 DH",
    },
    {
        name: "S 500 Sedan",
        price: "250 DH",
    },
    
  ];

  return (
    <div className="border rounded-2xl border-zinc-400 w-full grid grid-cols-9 small:grid-row-1 small:grid-col-9 large:grid-rows-10 gap-2 my-10 p-8">
      <div className="flex items-center justify-between col-span-9 row-span-1">
        <h1 className="font-bold py-4">Top placements</h1>
        <BiInfoCircle />
      </div>

      {carData.map((car, index) => (
        <div
          key={index}
          className="bg-zinc-100 justify-center items-center p-10 rounded-2xl small:row-span-1 small:col-span-9 large:col-span-3 large:row-span-3"
        >
          <CiShare1 className="float-right cursor-pointer" />
          <img src={Car} alt="car" className="m-auto h-auto " />
          <div>
            <h1 className="font-bold text-xl">{car.name}</h1>
            <p className="font-light text-lg">{car.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
