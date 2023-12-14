import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../../styles/styles'
import { IoTimeOutline, IoCalendarClearOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { format } from 'date-fns';



const PlanCard = ({ icon, price, title, description, active, onClick }) => {
	return (
		<div className={`flex items-center overflow-hidden rounded-xl ${active ? ' shadow-xl' : '  shadow-sm'} cursor-pointer`}
			onClick={onClick}
		>
			<div className={`flex lg:flex-row justify-center m-4 lg:m-0 rounded-md lg:rounded-none items-center p-4 w-[30%] h-full mr-4 ${active ? 'bg-black text-white' : 'bg-zinc-200 text-black'}`}>
				{icon}
			</div>
			<div className="p-4">
				<div className="text-lg font-bold">{title}</div>
				<div className="text-sm py-2">{description}</div>
				<div className="text-3xl font-semibold flex"><span className='text-xs text-light mr-1 self-start'>Only</span>{price}DH<span className='ml-2 text-xl text-red-400 line-through self-end '>{price+200}</span></div>
			</div>
		</div>
	);
};


export default function Booking() {

    const [activePlan, setActivePlan] = useState("daily");
    const [startDate, setStartDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const navigate = useNavigate();

    const BookingSubmit = () => {
      // Perform any necessary actions before navigating to the checkout page
  
      // Navigate to the checkout page
      navigate("/checkout");
    };

    useEffect(() => {
        // Fetch booked dates from API
        // Example: fetchBookedDates().then(data => setBookedDates(data));
    }, []);
    
        useEffect(() => {
            // Simulate fetching booked dates from the backend
            const fetchedBookedDates = ["2023-12-20", "2023-12-25", "2023-12-31"];
            setBookedDates(fetchedBookedDates);
        }, []);
    
        const isDayBooked = (date) => {
            // Format the date to match the backend format
            const formattedDate = date.toISOString().split('T')[0];
            return bookedDates.includes(formattedDate);
        };

    const handlePlanClick = (plan) => {
        setActivePlan(plan);
    };



    return(
        <div className=" container mx-auto my-10 space-y-6">
            	<div className="py-14 px-20 bg-white rounded-xl">
						<h3 className="font-light text-4xl mb-10">Your Plan is <span className="font-bold">{activePlan}</span> </h3>
						<div className="flex flex-col lg:flex-row justify-start gap-4">
							<PlanCard
								icon={<IoTimeOutline className="text-4xl" />}
								price={300}
								title="Daily Rent"
								description="Best for personal appointments"
								active={activePlan === "daily"}
								onClick={() => handlePlanClick("daily")} // Update state to "daily"
							/>
							<PlanCard
								icon={<IoCalendarClearOutline className="text-3xl" />}
								price={1500}
								title="Weekly Rent"
								description="Best for business appointments"
								active={activePlan === "weekly"}
								onClick={() => handlePlanClick("weekly")} // Update state to "weekly"
							/>
							<PlanCard
								icon={<IoCalendarClearOutline className="text-3xl" />}
								price={6900}
								title="Monthly Rent"
								description="Best for business appointments"
								active={activePlan === "monthly"}
								onClick={() => handlePlanClick("monthly")}
							/>
						</div>
					</div>
                    <div className="py-14 px-20 bg-white rounded-xl">
                        <h3 className="font-bold text-4xl mb-10">Select a Date</h3>
                        <div classname="customdatepickerwidth">
                            <DatePicker
                                inline
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                filterDate={isDayBooked}
                                className="w-full"
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.button} mx-0 mt-10 p-8 cursor-pointer`}
                         onClick={BookingSubmit}
                    >
                        <h5 className="text-white flex justify-center items-center">Go to shipping < AiOutlineArrowRight className="ml-4"/></h5>
                    </div>
                    </div>
    );
};
