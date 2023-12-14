import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import CarsCard from "./Cars/CarsCard";
import car1 from "../../../assets/iris 1.png";
import car2 from "../../../assets/iris-2.png";
import { Link } from "react-router-dom";

export default function PopularCars() {
	const cars = [
		{ carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },
		{ carImage: car2, carModel: 'GLA 250 SUV', transmission: 'Automatic', seats: '7', fuelType: 'Diesel' },
		{ carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },
		{ carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },
		{ carImage: car1, carModel: 'S 500 Sedan', transmission: 'Automatic', seats: '5', fuelType: 'Diesel' },

	];

	return (
		<div className="bg-[#E6E6E6]">
			<div className="large:px-36 px-4 py-12">
				<div className="flex justify-between p-3">
					<h1 className="text-center text-2xl font-bold">Popular Cars</h1>
					<Link to="car-list" className="flex items-center font-medium">
						See all <IoIosArrowForward size={20} color="#424242" />
					</Link>
				</div>
				<div className="relative flex justify-start mt-3 space-x-4 items-center overflow-hidden m-auto">
					<div
						className="absolute z-10 right-0 top-0 bottom-0 w-1/12"
						style={{
							background:
								"linear-gradient(to right, rgba(230, 230, 230, 0), rgba(230, 230, 230, 1))"
						}}

					></div>
					{cars.map((car, index) => (
						<CarsCard key={index} {...car} />
					))}
				</div>
			</div>
		</div>
	);
}
