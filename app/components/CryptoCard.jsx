import React from "react";
import { Button } from "./Button";

const CryptoCard = ({ data }) => {
  const { title, subTitle, timePeriod, bgColor, shadow } = data;
  return (
    <div
      className={`${bgColor} rounded-[10px] w-full py-4 px-4 lg:py-6 lg:px-6 ${shadow}`}
    >
      <p className=" font-basement font-normal text-base">{title}</p>
      <div className="flex mt-[6px]">
        <div className="flex-1">
          <div className="flex flex-col overflow-hidden pl-5 ">
            <ul className="list-disc flex flex-col gap-1">
              {subTitle.map((title, index) => {
                return (
                  <li
                    key={index}
                    className="list-disc text-base font-basement font-bold"
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-5">
            <Button
              variant={"outlined text-sm"}
              className={"py-1 px-5 text-nowrap"}
              size="text-base"
            >
              Remind me
            </Button>
          </div>
        </div>
        {timePeriod.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-1 flex flex-col gap-1.5 text-center"
            >
              <h1 className="text-lg md:text-xl font-basement text-white font-bold">
                {item.month}
              </h1>
              <h1 className="text-3xl lg:text-4xl font-basement text-white font-[900]">
                {item.date}
              </h1>
              <h1 className="text-lg md:text-xl font-basement text-white font-bold">
                {item.time}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoCard;
