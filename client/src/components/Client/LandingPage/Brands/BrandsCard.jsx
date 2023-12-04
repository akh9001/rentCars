import React from "react";

export default function BrandsCard({ brandName, logoSrc, count }) {
  return (
    <div className="rounded-lg bg-white hover:bg-zinc-100 cursor-pointer duration-300 shadow-sm text-center p-4 my-2 min-w-[160px] h-56">
      <div className="flex items-center h-32">
        <img className="m-auto" alt={`${brandName} logo`} src={logoSrc} />
      </div>
      <h3>{brandName}</h3>
      <p className="text-blue-500 font-bold">+{count}</p>
    </div>
  );
}
