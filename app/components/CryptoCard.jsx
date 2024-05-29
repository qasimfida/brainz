import React from "react";
import { Button } from "./Button";

const CryptoCard = ({ title, description, time, bgColor, shadow }) => {
  return (
    <div
      className={`${bgColor} rounded-[10px] w-full py-4 px-4 lg:py-6 lg:px-6 ${shadow}`}
    >
      <p className=" font-basement font-normal text-sm">{title}</p>
      <div className="mt-[6px]">
        <p className="text-sm font-basement font-bold">{description}</p>
        <h2 className="text-sm font-basement font-bold mt-2.5">{time}</h2>
        <div className="mt-5">
          <Button variant={"outlined text-sm"} className={"text-balance	"}>
            Remind me
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
