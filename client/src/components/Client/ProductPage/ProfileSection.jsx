import React from 'react';
import { Avatar } from "@mui/material";
import { StarRate as StarIcon } from "@mui/icons-material";

const ProfileSection = ({ profile, reviews }) => {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <div className="flex">
        <Avatar src={profile} alt="User Profile" sx={{ width: 72, height: 72 }} />
        <div className="ml-8 mt-2 flex-col">
          <span className="text-2xl font-semibold">Mohammed Folan</span>
          <div>
            <StarIcon className="text-yellow-400" />
            <span className="text-sm text-gray-600">{reviews}</span>
          </div>
        </div>
      </div>
      <span className="text-4xl font-bold">S 500 Sedan</span>
    </div>
  );
};

export default ProfileSection;
