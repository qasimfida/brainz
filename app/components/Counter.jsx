import React, { useState, useEffect } from "react";

export const Counter = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onTimerEnd,
}) => {
  const [time, setTime] = useState({ hours, minutes, seconds });
  const [color, setColor] = useState("bg-secondary");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(timer);
          onTimerEnd(); // Execute callback when timer ends
          return prevTime;
        } else {
          const newTime = { ...prevTime };
          if (newTime.seconds === 0) {
            if (newTime.minutes === 0) {
              if (newTime.hours === 0) {
                clearInterval(timer);
                onTimerEnd();
                return prevTime;
              } else {
                newTime.hours -= 1;
                newTime.minutes = 59;
                newTime.seconds = 59;
              }
            } else {
              newTime.minutes -= 1;
              newTime.seconds = 59;
            }
          } else {
            newTime.seconds -= 1;
          }
          // Change color to red when there are 30 seconds left
          if (
            newTime.hours === 0 &&
            newTime.minutes === 0 &&
            newTime.seconds <= 30
          ) {
            setColor("bg-danger-100");
          }
          return newTime;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hours, minutes, seconds, onTimerEnd]);

  // Function to pad single digit numbers with leading zero
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center justify-center">
        <div
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-3xl lg:text-5xl font-basement font-black text-dark">
            {padZero(time.hours)}
          </h1>
        </div>
        <p className="font-basement font-black text-5xl text-white">:</p>
        <div
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24  rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-3xl lg:text-5xl font-basement font-black text-dark">
            {padZero(time.minutes)}
          </h1>
        </div>
        <p className="font-basement font-black text-5xl text-white">:</p>
        <div
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24  rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-3xl lg:text-5xl font-basement font-black text-dark">
            {padZero(time.seconds)}
          </h1>
        </div>
      </div>
    </div>
  );
};
