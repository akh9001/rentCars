import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiWheelchairFill } from "react-icons/ri";
import { TbEngine, TbManualGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function CarsCard({ carId, carImage, carModel, transmission, seats, fuelType, addToCartHandler, category, price }) {



	return (
		<div className="relative bg-white cursor-pointer duration-300 rounded-xl shadow-md p-6">
			<div className="mt-1">
				<div className='flex justify-between px-3 py-2'>
					<h4 className="font-bold text-xl">{carModel}</h4>
					<AiOutlineShoppingCart
						size={25}
						className="cursor-pointer hover:bg-slate-100 rounded-full"
						color="#444"
						title="Add to cart"
						onClick={() => addToCartHandler(carId)}

					/>
				</div>
				<h3 className='px-3 pb-2 text-zinc-600 font-normal text-md'>{category}</h3>
				<img src={carImage} alt={carModel} className=" h-72 w-full object-cover mb-4 rounded-xl" />
				<div className="font-normal space-x-2 w-full text-sm text-zinc-800 my-8 flex items-center justify-center">
					<p className="py-3 px-4  justify-center bg-slate-100 items-center rounded-full flex">
						<TbManualGearbox className="mx-1 text-lg" />{transmission}
					</p>
					<p className="py-3 px-4 justify-center flex bg-slate-100 items-center rounded-full">
						<RiWheelchairFill className="mx-1 text-lg" />{seats} Seats
					</p>
					<p className="py-3 px-4 justify-center flex items-center bg-slate-100 rounded-full">
						<TbEngine className="mx-1 text-lg" />{fuelType}
					</p>
				</div>
				<div className="flex items-center justify-between text-sm">
					<div className="text-3xl font-semibold flex"><span className='text-xs text-light mr-1 self-start'>Only</span>{price}DH<span className='ml-2 text-xl text-red-400 line-through self-end '>{price + 200}</span></div>
					<Link to={`/product/${carId}`}>
						<button className="bg-black text-white mx-4 py-4 px-10 rounded-full  hover:bg-zinc-700 duration-300">Rent Now</button>
					</Link> 
				</div>
			</div>
		</div>
	);
}
