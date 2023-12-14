import { FaSearch, FaRegCheckCircle, FaSmile } from 'react-icons/fa';
import pattern from "../../../assets/bg.png"
import carVisual from "../../../assets/topViewCar.png"


const StepCard = ({ icon, title, description }) => (
	<div className="lg:flex flex-col  items-start space-x-4 border rounded-lg hover:bg-zinc-100 duration-300 border-zinc-200 p-6">
		<div className="p-4 large:ml-4 large:mb-2 large:bg-gray-200 rounded-full">{icon}</div>
		<div>
			<h4 className="font-bold text-lg">{title}</h4>
			<p className="text-sm text-gray-600">{description}</p>
		</div>
	</div>
);

export default function HowWorks() {
	return (
		<div>
			<div className="text-center pt-16 m-auto max-w-2xl ">
				<h2 className="text-3xl font-bold">How it works</h2>
				<p className="text-gray-600 mt-4 px-12">
					Renting a luxury car has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online.
				</p>
			</div>


			<div className="flex justify-center items-center p-6">
				<div className='w-1/2 m-24'>

					<div className="space-y-4 ">
						<StepCard
							icon={<FaSearch />}
							title="Browse and select"
							description="Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best."
						/>
						<StepCard
							icon={<FaRegCheckCircle />}
							title="Book and confirm"
							description="Book your desired car with just a few clicks and receive an instant confirmation via email or SMS."
						/>
						<StepCard
							icon={<FaSmile />}
							title="Enjoy your ride"
							description="Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service."
						/>
					</div>
				</div>
				<div className='relative large:flex hidden justify-center items-center bg-gray-100 w-1/2 rounded-2xl m-6'>
					<img src={carVisual} alt="Luxury Car" className="absolute h-[90%] right-96 " />

					<img src={pattern} alt='pattern' className='w-full p-6' />
				</div>
			</div>
		</div>
	);
};
