import { BiStar } from 'react-icons/bi'; 
import { IoMdHand } from 'react-icons/io'; 
import { GiTakeMyMoney } from 'react-icons/gi';

const ServiceCard = ({ Icon, title, description }) => (
  <div className="flex flex-col w-full md:w-80 items-center p-6 bg-white rounded-lg shadow-md">
    <Icon className="text-2xl mb-4" />
    <h5 className="text-lg font-bold mb-2">{title}</h5>
    <p className="text-center text-sm text-gray-600">{description}</p>
  </div>
);

const Benefits = () => {
  return (
    <div className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 text-white">
          <h2 className="text-3xl font-bold mb-3">Our Services & Benefits</h2>
          <p className="text-gray-200 text-sm font-light">
            To make renting easy and hassle-free, we provide a variety of services and
            advantages. We have you covered with a variety of vehicles and flexible rental terms.
          </p>
        </div>
        <div className="flex large:flex-row flex-col md:flex-row justify-center gap-4">
          <ServiceCard
            Icon={BiStar}
            title="Quality Choice"
            description="We offer a wide range of high-quality vehicles to choose."
          />
          <ServiceCard
            Icon={GiTakeMyMoney}
            title="Affordable Prices"
            description="Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips."
          />
          <ServiceCard
            Icon={IoMdHand}
            title="Quality Choice"
            description="We offer a wide range of high-quality vehicles to choose."
          />
        </div>
      </div>
    </div>
  );
};

export default Benefits;
