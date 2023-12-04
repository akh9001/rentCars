import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { BsCalendarDate } from "react-icons/bs";
import Slider from "react-slick";
import profile from "../../Assets/profile.jpg";
import luxuryCar from "../../Assets/LuxuryCar.jpg";
import ElectricCars from "../../Assets/ElectricCar.jpg";
import SUVCar from "../../Assets/SuvCar.jpg";
import { Avatar, Divider } from "@mui/material";
import { StarRate as StarIcon } from "@mui/icons-material";
import { AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { GrDown, GrUp } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LightNavBar from "../../components/Client/LightNavBar";
import { FaCar, FaUserFriends, FaBatteryFull, FaTachometerAlt } from "react-icons/fa";
import { IoTimeOutline, IoCalendarClearOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const carImages = [luxuryCar, ElectricCars, SUVCar];


const location = {
    address: '200-298 Ghandi St Casablanca, CA 94114, Morocco',
    lat: 33.5731104, // Latitude
    lng: -7.5898434  // Longitude
  };
  
  const center = {
    lat: 33.5731, // Latitude for Casablanca
    lng: -7.5898, // Longitude for Casablanca
  };


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
          <div className="text-2xl font-semibold">{price}</div>
        </div>
      </div>
    );
  };

const imageSliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  className: "rounded-xl flex justify-center items-center",
};

const ImageCarousel = ({ images }) => (
  <Slider {...imageSliderSettings}>
    {images.map((image, idx) => (
      <div key={idx} className="large:h-[400px] h-[250px] w-full flex justify-center items-center">
        <img src={image} alt={`Slide ${idx}`} className="rounded-xl w-full h-full object-cover" />
      </div>
    ))}
  </Slider>
);



const SpecItem = ({ icon, title }) => (
  <div className="flex-col items-center justify-center my-4 lg:my-0">
    <div className="text-white flex justify-center text-3xl mb-2">{icon}</div>
    <p className="text-white text-lg">{title}</p>
  </div>
);


  


export default function ProductPage() {

    const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

    const [isMapVisible, setIsMapRangeVisible] = useState(false);


    const [selectedRange, setSelectedRange] = useState([
      {
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    const handleSelect = (ranges) => {
        setSelectedRange([ranges.selection]);
      };
      
      const toggleDateRange = () => {
        setIsDateRangeVisible(!isDateRangeVisible);
      };

      const toggleMapRange = () => {
        setIsMapRangeVisible(!isMapVisible);
      };

      
      const [activePlan, setActivePlan] = useState("daily"); 

      const handlePlanClick = (plan) => {
          setActivePlan(plan); 
        };
      

    

  return (
    <div className="bg-zinc-200">
      <LightNavBar />
      <div className="large:mx-36 mx-8">
        <div className="w-full flex justify-between">
          <div className="bg-white hover:bg-zinc-100 cursor-pointer flex justify-center items-center rounded-xl my-6 shadow-lg h-14 w-14">
            <AiOutlineLeft size={35} />
          </div>
          <div className="bg-white hover:bg-zinc-100 cursor-pointer flex justify-center items-center rounded-xl my-6 shadow-lg h-14 w-14">
            <AiOutlineHeart size={35} />
          </div>
        </div>

        <div className="flex-col bg-white rounded-t-xl justify-center py-28 px-16 large:px-44">
          <div className="flex flex-col lg:flex-row gap-4 items-center large:justify-between w-full mb-6">
            <div className="gap-4 flex ">
              <Avatar
                src={profile}
                alt="Mohammed Folan"
                sx={{ width: 72, height: 72 }}
              />
              <div className="large:ml-8 mt-2 flex-col">
                <span className="large:text-2xl  font-semibold">Mohammed Folan</span>
                <div>
                  <StarIcon className="text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    4.9 (230 Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-4xl font-bold">S 500 Sedan</span>
            </div>
          </div>
          <div className="flex-col ml-0 gap-4 mb-6">
            <h3 className="font-bold text-4xl my-10">Pictures</h3>
            <div className="container relative flex-col z-10 justify-center items-center large:mx-auto large:px-10 px-8 py-8 bg-black rounded-2xl min-w-full">
              <ImageCarousel images={carImages} />
            </div>
          </div>

          <Divider className="w-full mb-6 " />

          <div className="p-4">
            <h3 className="font-bold text-4xl my-10">Specs</h3>
            <div className="w-full mx-auto">
              <div className="bg-black flex flex-col lg:flex-row items-center justify-around p-4 large:p-14 my-6 rounded-lg">
                <SpecItem icon={<FaTachometerAlt />} title="4,000" />
                <SpecItem icon={<FaCar />} title="Auto" />
                <SpecItem icon={<FaUserFriends />} title="4 Person" />
                <SpecItem icon={<FaBatteryFull />} title="Electric" />
              </div>
            </div>
          </div>

          <Divider className="w-full mb-6" />

         
    <div className="p-4">
      <h3 className="font-bold text-4xl my-10">Your Plan is <span className="font-light">{activePlan}</span> </h3>
      <div className="flex flex-col lg:flex-row justify-start gap-4">
      <PlanCard
          icon={<IoTimeOutline className="text-4xl" />}
          price="300Dh"
          title="Daily Rent"
          description="Best for personal appointments"
          active={activePlan === "daily"}
          onClick={() => handlePlanClick("daily")} // Update state to "daily"
        />
        <PlanCard
          icon={<IoCalendarClearOutline className="text-3xl" />}
          price="1900Dh"
          title="Weekly Rent"
          description="Best for business appointments"
          active={activePlan === "weekly"}
          onClick={() => handlePlanClick("weekly")} // Update state to "weekly"
        />
        <PlanCard
          icon={<IoCalendarClearOutline className="text-3xl" />}
          price="12900Dh"
          title="Monthly Rent"
          description="Best for business appointments"
          active={activePlan === "monthly"}
          onClick={() => handlePlanClick("monthly")}
        />
      </div>
    </div>

          <Divider className="w-full mb-6" />

          <div className="p-4">
      <h3 className="font-bold text-4xl my-10">Location</h3>
      <div className="cursor-pointer hover:shadow-xl w-full border border-zinc-500 hover:bg-zinc-200 p-4 flex items-center justify-between rounded-lg my-8 shadow-sm"
           onClick={toggleMapRange}>
        <MdLocationOn className="hidden lg:visible lg:text-3xl mr-4" />
        <p className="text-lg">
        {location.address}
        </p>
        {isMapVisible ? <GrUp size={25} className="text-zinc-700 ml-2" /> : <GrDown size={25} className="text-zinc-700 ml-2" />}
      </div>

      {isMapVisible && (
        <LoadScript googleMapsApiKey="Map-google-api">
            <GoogleMap center={center} zoom={15}>
            <Marker position={center} />
            </GoogleMap>
        </LoadScript>
      )}

    </div>
          <Divider className="w-full mb-6" />
          <div className="p-4 my-8">
          <h3 className="font-bold text-4xl my-10">Booking</h3>
          <div className=" border border-zinc-500 rounded-xl flex flex-col lg:flex-row justify-center items-center bg-zinc-50">
                   
                    <div className="flex relative m-auto">
                        <div className="flex-col justify-center items-center m-8  ">
                            <h3>Pick-up Date and Time</h3>
                         
                            <button  className={`flex items-center hover:shadow-lg border-zinc-500 text-xs large:text-sm shadow-sm border ${isDateRangeVisible ? ' bg-white text-black':' bg-none'} rounded-md p-3 m-auto`}
                                onClick={toggleDateRange}>
                                <BsCalendarDate size={15} className={` mr-2 ${isDateRangeVisible ? 'text-[#3D91FF]'  : 'text-zinc-700' }`} />
                                {selectedRange[0].endDate.toLocaleDateString()} - {selectedRange[0].startDate.toLocaleDateString()}
                                
                                {isDateRangeVisible ? <GrUp size={15} className="text-zinc-700 ml-2" /> : <GrDown size={15} className="text-zinc-700 ml-2" />}
                            </button>

                        </div>
                    </div>
       

        {isDateRangeVisible && (
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={selectedRange}
            className="shadow-lg m-10"
          />
        )}
          </div>
        </div>

        <Divider className="w-full mb-6" />

        <div className="flex flex-col gap-8 lg:flex-row items-center justify-between w-full my-16">
            <h3>Total: </h3>
            <p className="large:text-4xl text-2xl font-bold italic">300 DH <span className="large:text-3xl font-normal text-zinc-400">/ Day</span></p>
            <button className="rounded-xl border border-black bg-yellow-400 hover:bg-yellow-500 font-semibold flex px-8 py-4 justify-center items-center">Pick Up <AiOutlineRight className="ml-2"/></button>
        </div>

          </div>

        
       
      </div>
    </div>
  );
}