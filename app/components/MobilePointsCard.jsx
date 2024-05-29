import Image from "next/image";
import React from "react";
import profileImage from "@/public/images/avatar.jpeg";

export const MobilePointsCard = () => {
  return (
    <div className="w-full flex gap-[14px] items-center bg-gradient-to-r from-white/20 to-[#C6C6C6]/10 rounded-[4px] px-[10px] py-[6px]">
      <div className="relative w-[24px] h-[24px] rounded-full border border-secondary">
        <Image
          src={profileImage}
          alt="profile"
          layout="fill"
          className="rounded-full"
        />
      </div>
      <div>
        <h1 className="text-secondary font-basement font-bold">R1 : 5 pts</h1>
        <h1 className="text-white font-basement font-normal">User9850</h1>
      </div>
    </div>
  );
};
