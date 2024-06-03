"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import profileImage from "@/public/images/avatar.jpeg";
import { CheckCirclekIcon } from "../components/Svgs";
import Image from "next/image";

const Context = createContext();
export const NotificationContext = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Context.Provider value={{ open, toggleOpen }}>
      {open && <Notification onClose={toggleOpen} />}
      {children}
    </Context.Provider>
  );
};

export const useNotification = () => useContext(Context);

const Notification = ({ open }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    const totalDuration = 3000; // 3 seconds
    const updateInterval = 100; // Update every 100ms
    const increment = updateInterval / totalDuration;

    timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(timer);
          return 0;
        } else {
          return prevProgress + increment;
        }
      });
    }, updateInterval);
    return () => clearInterval(timer);
  }, [open]);

  return (
    <div className="max-w-xs md:max-w-md w-full z-50 fixed top-[50px] md:top-[130px] right-[-140px] md:right-[-126px] transform -translate-x-1/2 bg-primary-350 pt-3 pb-4 pl-8 pr-8 rounded-[10px] shadow-lg">
      <div className="text-white">
        <h1 className="text-base font-semibold font-inter text-start">
          Connected as
        </h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 pt-2.5">
            <div className="relative min-w-8 min-h-8 lg:min-w-10 lg:min-h-10 rounded-full pt-2.5">
              <Image
                src={profileImage}
                alt="Profile"
                layout="fill"
                className="rounded-full"
                objectFit="cover"
                draggable={false}
                priority={true}
              />
            </div>
            <p className="text-base lg:text-xl font-normal text-left text-wrap max-w-44">
              Blue_guy78 0x1aCD...4754
            </p>
          </div>
          <div>
            <CheckCirclekIcon />
          </div>
        </div>
        <div className="w-full h-1 mt-3 overflow-hidden bg-white rounded">
          <div
            className="h-full bg-secondary"
            style={{
              width: `${100 - progress * 100}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};
