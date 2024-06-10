import Image from "next/image";
import React from "react";

export const MobilePointsCard = ({ data }) => {
  const { profileImage, rank, points, username } = data;
  return (
    <div className="w-full flex gap-3 items-center bg-gradient-to-r from-white/20 to-[#C6C6C6]/10 rounded-[4px] px-2.5 py-1.5">
      <div className="relative border rounded-full min-w-6 min-h-6 border-secondary">
        <Image
          src={profileImage}
          alt="profile"
          layout="fill"
          className="rounded-full"
          draggable={false}
          priority={true}
        />
      </div>
      <div>
        <h1 className="flex gap-3 font-bold text-secondary font-basement">
          <span> R{rank}:</span>
          {points}
        </h1>
        <h1 className="font-normal text-white font-basement">{username}</h1>
      </div>
    </div>
  );
};
