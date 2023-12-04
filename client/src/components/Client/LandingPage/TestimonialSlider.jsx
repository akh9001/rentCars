import React from 'react';
import Slider from 'react-slick';
import profile1 from '../../../assets/profile.jpg';
import { FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<FaChevronLeft
			className={className}
			style={{ ...style, display: 'block', color: 'black' }}
			onClick={onClick}
		/>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<FaChevronRight
			className={className}
			style={{ ...style, display: 'block', color: 'black' }}
			onClick={onClick}
		/>
	);
}

const Testimonials = [
	{
		id: 1,
		content: "This service is fantastic! My journey was seamless and comfortable, highly recommended.",
		author: "Jane Doe",
		rating: 5,
		image: profile1,
	},
	{
		id: 2,
		content: "I was really impressed with the quality of the vehicles and the professionalism of the service.",
		author: "John Smith",
		rating: 4,
		image: profile1,
	},
	// Add more testimonials as needed
];

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		},
	],
};

const StarRating = ({ rating }) => {
	return (
		<div className="flex items-center justify-center">
			{[...Array(5)].map((_, index) => (
				<FaStar key={index} className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
			))}
		</div>
	);
};

const TestimonialSlider = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className='font-bold text-center text-2xl p-10'>What Our Customers Say</h1>
			<Slider {...settings}>
				{Testimonials.map((testimonial) => (
					<div key={testimonial.id} className="outline-none">
						<div className="bg-white rounded-lg max-w-3xl p-8 text-center m-auto border-2">
							<img src={testimonial.image} alt={testimonial.author} className="w-24 h-24 mx-auto object-cover rounded-full mb-2" />
							<h5 className="text-gray-800 font-bold">{testimonial.author}</h5>
							<StarRating rating={testimonial.rating} />
							<p className="text-gray-600 italic my-4 max-w-xl m-auto">{testimonial.content}</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default TestimonialSlider;
