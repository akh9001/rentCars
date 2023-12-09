import React, { useState } from "react";
import LightNavBar from "../../components/Client/LightNavBar";
// import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../../components/Client/Profile/ProfileSidebar";
import ProfileContent from "../../components/Client/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  // const { loading } = useSelector((state) => state.user);
     const [active, setActive] = useState(1);


  return (
    <div className='bg-[#F2F2F2]'>
      {/* {loading ? (
        <Loader />
      ) : (
        <> */}
          <LightNavBar/>
          <div className="w-10/12 mx-auto flex bg-[#e9e9e9] p-16 rounded-xl">
            <div className="w-[50px] 800px:w-[335px] sticky ">
            <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        {/* </>
      )} */}
    </div>
  );
};

export default ProfilePage;
