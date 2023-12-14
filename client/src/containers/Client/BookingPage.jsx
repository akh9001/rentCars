import CheckoutSteps from "../../components/Client/Checkout/CheckoutSteps";
import LightNavBar from "../../components/Client/LightNavBar";
import Booking from "../../components/Client/Booking/Booking"

export default function BookingPage() {
    return(
        <div className='flex-col items-center justify-center bg-[#F2F2F2]'>
        <LightNavBar/>
        <br />
        <br />
        <CheckoutSteps active={0} />
        <Booking/>
        <br />
        <br />
    </div>
    );
};
