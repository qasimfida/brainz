"use client";

import { TicketCard } from "@/app/components/TicketCard";
import { gameData, ticketData } from "./data";

export const Shop = () => {
  return (
    <div className="text-white">
      <div className="bg-primary-350 pb-[78px] w-full rounded-[10px] mt-6 py-[34px] px-6 md:px-[52px]">
        <h1 className="text-xl font-basement font-bold">Purchase Tickets</h1>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-[56px] flex flex-wrap mt-8">
          {ticketData.map((ticket, index) => (
            <TicketCard key={index} {...ticket} iconColor="text-danger-100" />
          ))}
        </div>
      </div>
      <div className="bg-primary-350 px-6 md:px-[52px] py-[34px] w-full rounded-[10px] mt-4 mb-[22px]">
        <h1 className="font-basement text-xl font-bold">Purchase Diamonds</h1>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-[56px] flex flex-wrap mt-8">
          {gameData.map((game, index) => (
            <TicketCard key={index} {...game} iconColor="text-success" />
          ))}
        </div>
      </div>
    </div>
  );
};
