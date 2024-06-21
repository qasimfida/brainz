import { convertMillisecondsToHMS } from "@/lib/utils";
import React, { useState, useEffect } from "react";

export const Counter = ({ timeRemaining, onTimerEnd }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [color, setColor] = useState("bg-secondary");

  useEffect(() => {
    setTime(convertMillisecondsToHMS(timeRemaining));
  }, [timeRemaining]);

  // Function to pad single digit numbers with leading zero
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center justify-center">
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg sm:text-xl md:2xl lg:text-3xl font-basement font-black text-dark">
            {padZero(time.hours)}
          </h1>
        </div>
        <p className="font-basement font-black text-5xl text-white">:</p>
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg sm:text-xl md:2xl lg:text-3xl font-basement font-black text-dark">
            {padZero(time.minutes)}
          </h1>
        </div>
        <p className="font-basement font-black text-5xl text-white">:</p>
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg sm:text-xl md:2xl lg:text-3xl  font-basement font-black text-dark">
            {padZero(time.seconds)}
          </h1>
        </div>
      </div>
    </div>
  );
};
