"use client";
import { Button } from "@/app/components/Button";
import CryptoCard from "@/app/components/CryptoCard";
import SessionCard from "@/app/components/SessionCard";
import { TicketIcon } from "@/app/components/Svgs";
import { cryptoCardData } from "./data";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import CountdownTimer from "@/app/components/CountDownTimer";

export const Dashboard = () => {
  // console.log({ open });
  return (
    <div className="text-white bg-primary">
      <div className="bg-primary-350  pb-5 w-full rounded-[10px] mt-3 hidden md:block">
        <div className="flex flex-wrap items-center justify-between px-8 pt-4 gap-14">
          <h1 className="flex-1 text-xl font-bold font-basement ">
            Live Games
          </h1>
          <h1 className="flex-1 pl-1 text-2xl font-bold font-basement">
            Starting in
            <CountdownTimer initialMinutes={1} initialSeconds={35} />
          </h1>
        </div>
        <div className="flex flex-col hidden gap-16 mt-8 px-14 md:flex md:flex-row md:flex-wrap">
          <div className="flex-1">
            <SessionCard />
          </div>
          <div className="flex flex-col flex-1 mt-3 lg:mt-0">
            <p className="pl-1 text-lg font-normal font-basement">
              1 of 3 Session | 13min
            </p>
            <p className="text-xl font-normal font-basement pt-9">Pot Size</p>
            <h1 className="mt-4 mb-6 text-2xl font-bold font-basement">
              35,589USDT
            </h1>
            <div>
              <Link href={"/dashboard/session"}>
                <Button variant="outlined" size="text-base">
                  Take a Seat
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <TicketIcon
                height={18}
                width={18}
                className={"text-danger-100"}
              />
              <p className="flex gap-1 text-base font-normal">
                <span>01</span>
                Ticket Required to attend session
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-0 lg:pb-4 bg-primary-350 rounded-[10px]">
        <div className=" hidden md:block  w-full rounded-[10px] mt-4 mb-5">
          <h1 className="pt-4 pl-8 text-xl font-bold font-basement">
            Upcoming Games
          </h1>
          <div className="grid grid-cols-1 mt-8 px-14 md:grid-cols-1 gap-14 lg:grid-cols-2 xl:grid-cols-3">
            {cryptoCardData.map((card, index) => (
              <CryptoCard key={index} data={card} />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Screen Tabs */}
      <div className="pt-3 md:hidden ">
        <Tab.Group>
          <Tab.List className="flex justify-center w-full px-5">
            <Tab className={"w-full focus:outline-none"}>
              {({ selected }) => (
                <h1
                  className={`pt-4 text-base font-basement font-bold focus:outline-none pb-2.5 
                       ${
                         selected
                           ? "border-b-2 border-secondary focus:outline-none"
                           : "border-b-2 border-grey-500 text-grey-500 "
                       }`}
                >
                  Live Games
                </h1>
              )}
            </Tab>
            <Tab className={"w-full focus:outline-none"}>
              {({ selected }) => (
                <h1
                  className={`pt-4 text-base font-basement font-bold focus:outline-none  pb-2.5 w-full
                       ${
                         selected
                           ? "border-b-2 border-secondary focus:outline-none"
                           : "border-b-2 border-grey-500 text-grey-500"
                       }`}
                >
                  Upcoming Games
                </h1>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={"pb-0"}>
            <Tab.Panel>
              <div className="flex flex-col gap-4 pl-6 pr-12 mt-10 text-center">
                <div className="text-center">
                  <h1 className="pl-0 text-xl font-bold md:pl-8 font-basement">
                    Starting in
                    <CountdownTimer initialMinutes={1} initialSeconds={35} />
                  </h1>
                </div>
                <div className="flex-1">
                  <SessionCard />
                </div>
                <div className="flex flex-col flex-1 mt-8 lg:mt-0">
                  <p className="text-lg lg:text-xl pl-[5px] font-basement font-normal">
                    1 of 3 Session | 13min
                  </p>
                  <p className="pt-5 text-lg font-normal lg:text-xl font-basement lg:pt-9">
                    Pot Size
                  </p>
                  <h1 className="text-xl lg:text-[26px] font-basement font-bold mt-3 lg:mt-4 mb-6">
                    35,589USDT
                  </h1>
                  <div>
                    <Link href={"/dashboard/session"}>
                      <Button variant="outlined" size="text-base lg:text-xl">
                        Take a Seat
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <TicketIcon
                      height={18}
                      width={18}
                      className={"text-danger-100"}
                    />
                    <p className="text-base font-normal">
                      01 Tickets Required to attend session
                    </p>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-10 w-full rounded-[10px] mb-5 pl-6 pr-10">
                {/* <h1 className="text-xl font-bold text-center font-basement">
                  Upcoming Games
                </h1> */}
                <div className="flex flex-col mt-4 gap-9 lg:flex-row">
                  {cryptoCardData.map((card, index) => (
                    <CryptoCard key={index} data={card} isFirst={index === 0} />
                  ))}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
