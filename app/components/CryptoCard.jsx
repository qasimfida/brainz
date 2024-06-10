import React from "react";
import { Button } from "./Button";

const CryptoCard = ({ data }) => {
  const { title, subTitle, timePeriod, bgColor, shadow } = data;
  return (
    <div
      className={`${bgColor} rounded-[10px] w-full py-4 px-4 lg:py-6 lg:px-6 ${shadow}`}
    >
      <p className="text-base font-normal font-basement">{title}</p>
      <div className="flex mt-[6px]">
        <div className="flex-1">
          <div className="flex flex-col pl-5 overflow-hidden ">
            <ul className="flex flex-col gap-1 list-disc">
              {subTitle.map((title, index) => {
                return (
                  <li
                    key={index}
                    className="text-base font-bold list-disc font-basement"
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-5">
            <Button
              variant={"outlined"}
              className={"pt-1 pb-1 px-3.5 text-nowrap "}
              size="text-sm"
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
              <h1 className="text-lg font-bold text-white md:text-xl font-basement">
                {item.month}
              </h1>
              <h1 className="text-3xl lg:text-4xl font-basement text-white font-[900]">
                {item.date}
              </h1>
              <h1 className="text-lg font-bold text-white md:text-xl font-basement">
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
