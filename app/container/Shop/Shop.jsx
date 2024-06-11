"use client";

import { TicketCard } from "@/app/components/TicketCard";
import { gameData, ticketData } from "./data";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setIsLoading]);

  return (
    <div className="text-white">
      <div className="bg-primary-350 py-8 md:pb-20 w-full rounded-[10px] mt-6 px-6 md:px-13">
        <h1 className="text-xl font-bold font-basement">
          Use tickets to enter a session
        </h1>
        <div className="flex grid flex-wrap gap-6 mt-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-14">
          {isLoading
            ? [...Array(ticketData.length)].map((_, index) => (
                <Skeleton key={index} height={196} borderRadius={"1.5rem"} />
              ))
            : ticketData.map((ticket, index) => (
                <TicketCard
                  key={index}
                  {...ticket}
                  iconColor="text-danger-100"
                />
              ))}
        </div>
      </div>
      <div className="bg-primary-350 px-6 md:px-13 py-8 w-full rounded-[10px] mt-6 mb-0 md:mb-5">
        <h1 className="text-xl font-bold font-basement">
          Use Diamonds to unblock in-game perks
        </h1>
        <div className="flex grid flex-wrap gap-6 mt-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-14">
          {isLoading
            ? [...Array(gameData.length)].map((_, index) => (
                <Skeleton key={index} height={196} borderRadius={"1.5rem"} />
              ))
            : gameData.map((game, index) => (
                <TicketCard key={index} {...game} iconColor="text-success" />
              ))}
        </div>
      </div>
    </div>
  );
};
