import React from "react";
import SessionTitleCard from "./SessionTitleCard";
import { DiamondIcon } from "./Svgs";
import { Counter } from "./Counter";

export const CountDown = ({ onComplete }) => {
  const handleTimerEnd = () => {
    onComplete();
  };
  return (
    <div className="w-full flex flex-col lg:flex-row md:flex-row sm:flex-col">
      <div className="w-full lg:w-2/3 px-0 lg:px-12 ">
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
            <div className="lg:mt-9 mt-3 flex flex-col items-center justify-between">
              <p className="mb-3 text-lg lg:text-xl font-basement font-normal">
                pot size
              </p>
              <p className="font-basement font-bold text-2xl lg:text-3xl">
                35,589usdt
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* second grid */}
      <div className="flex flex-col items-center text-white mt-6 lg:mt-0">
        <div className="flex flex-col justify-end w-full">
          <h2 className="text-white font-basement font-bold text-xl lg:text-2xl capitalize mb-5 lg:mb-7">
            Rules
          </h2>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <SessionTitleCard
                title="Speed Matters"
                speed="17:02"
                description="Answer quickly. In case of 2 or more players reaching the highest score, the player with the quickest completion time wins."
                bgColor="bg-gradient-to-r from-[#283b49] to-[#0f2433]"
                noIcon
              />
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-4 lg:mt-9">
          <p className="mb-5 text-white font-semibold text-xl lg:text-2xl font-basement lg:flex lg:items-end">
            You can only use 1 of these in session
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 mb-4 lg:mb-0">
              <SessionTitleCard
                title="50/50"
                number="05"
                icon={DiamondIcon}
                description="Use a 50/50 to remove 2 wrong answers from the board."
                bgColor="bg-gradient-to-r from-[#06262c] to-[#05212a]"
              />
            </div>
            <div className="flex-1">
              <SessionTitleCard
                title="Auto correct"
                number="10"
                icon={DiamondIcon}
                description="The Auto-correct is your free pass to skip a question but still get the points"
                bgColor="bg-gradient-to-r from-[#06262c] to-[#05212a]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
