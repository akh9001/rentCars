import BrandsSection from "../../components/Client/LandingPage/BrandsSection";
import WelcomeSection from "../../components/Client/LandingPage/WelcomeSection";
import NavBar from "../../components/Client/NavBar";

export default function LandingPage() {
    return(
        <div>
            <NavBar/>
            <WelcomeSection/>
            <div className=" max-w-7xl m-auto">
            <BrandsSection/>
            </div>
        </div>
        
        
    );
};
