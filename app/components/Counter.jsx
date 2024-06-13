import React, { useState, useEffect, useRef } from "react";
import beepSound from "@/public/sounds/countdown-sound.wav";

export const Counter = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onTimerEnd,
}) => {
  const [time, setTime] = useState({ hours, minutes, seconds });
  const [color, setColor] = useState("bg-secondary");
  const [soundPlayed, setSoundPlayed] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          clearInterval(intervalRef.current);
          stopSound();
          onTimerEnd(); // Execute callback when timer ends
          return prevTime;
        } else {
          const newTime = { ...prevTime };
          if (newTime.seconds === 0) {
            if (newTime.minutes === 0) {
              if (newTime.hours === 0) {
                clearInterval(intervalRef.current);
                stopSound();
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
          // Change color to red when there are 10 seconds or less left
          if (
            newTime.hours === 0 &&
            newTime.minutes === 0 &&
            newTime.seconds <= 10
          ) {
            setColor("bg-danger-100");
            if (newTime.seconds === 10 && !soundPlayed) {
              playSound();
              setSoundPlayed(true);
            }
          }
          return newTime;
        }
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [hours, minutes, seconds, onTimerEnd, soundPlayed]);

  // Function to pad single digit numbers with leading zero
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // Function to play the sound
  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(beepSound);
    }
    audioRef.current.play().catch((error) => {
      // Play failed - handle error
      console.error("Failed to play sound:", error);
    });
  };

  // Function to stop the sound
  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3">
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg font-black sm:text-xl md:2xl lg:text-3xl font-basement text-dark">
            {padZero(time.hours)}
          </h1>
        </div>
        <p className="text-5xl font-black text-white font-basement">:</p>
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg font-black sm:text-xl md:2xl lg:text-3xl font-basement text-dark">
            {padZero(time.minutes)}
          </h1>
        </div>
        <p className="text-5xl font-black text-white font-basement">:</p>
        <div
          className={`w-12 h-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-[10px] flex items-center justify-center ${color}`}
        >
          <h1 className="text-lg font-black sm:text-xl md:2xl lg:text-3xl font-basement text-dark">
            {padZero(time.seconds)}
          </h1>
        </div>
      </div>
    </div>
  );
};
