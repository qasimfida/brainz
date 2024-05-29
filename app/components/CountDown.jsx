import React from "react";
import SessionTitleCard from "./SessionTitleCard";
import { DiamondIcon } from "./Svgs";
import { Counter } from "./Counter";

export const CountDown = ({ onComplete }) => {
  const handleTimerEnd = () => {
    onComplete();
  };

  return (
    <div className="w-full flex flex-col gap-12 lg:gap-24 lg:flex-row md:flex-row sm:flex-col">
      <div className="flex-1">
        <div className="h-full justify-center text-white flex flex-col items-center ">
          <div className="text-center">
            <p className="font-basement mb-[20px] text-base lg:text-lg font-normal uppercase">
              starting in
            </p>
            <div>
              <Counter
                onTimerEnd={handleTimerEnd}
                hours={0}
                minutes={0}
                seconds={10}
              />
            </div>
            <p className="pt-6 lg:pt-9 text-lg lg:text-2xl font-basement font-normal">
              1 of 3 sessions | 13min
            </p>
            <div className="lg:mt-9 mt-3 flex flex-col items-center justify-between">
              <p className="mb-3 text-lg lg:text-xl font-basement font-normal">
                pot size
              </p>
              <p className="font-basement font-bold text-2xl lg:text-[38px]">
                35,589usdt
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 items-center flex-col text-white ">
        <div className="flex flex-col justify-end">
          <h2 className=" text-white font-basement font-bold text-2xl capitalize mb-7">
            rules
          </h2>
          <SessionTitleCard
            title="speed matters"
            description="Lorem ipsum dolor sit amit, consectur. Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur."
            bgColor="bg-gradient-to-r from-[#283b49] to-[#0f2433]"
            noIcon
          />
        </div>
        <div className="w-full flex flex-col ">
          <p className="mt-9 mb-[20px] text-white font-semibold text-2xl font-basement lg:flex lg:items-end">
            You can only use 1 of these in session
          </p>
          <SessionTitleCard
            title="50/50"
            number="05"
            icon={DiamondIcon}
            description="Lorem ipsum dolor sit amit, consectur. Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur."
            bgColor="bg-gradient-to-r from-[#06262c] to-[#05212a]"
          />
          <div className="mt-5">
            <SessionTitleCard
              title="Auto correct"
              number="10"
              icon={DiamondIcon}
              description="Lorem ipsum dolor sit amit, consectur. Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur.Lorem ipsum dolor sit amit, consectur."
              bgColor="bg-gradient-to-r from-[#06262c] to-[#05212a]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
