"use client";
import Input from "@/app/components/Input";
import TermsConditionsModal from "@/app/components/Modals/TermsConditionsModal";
import WalletTabs from "@/app/components/WalletTabs";
import Link from "next/link";
import { useState } from "react";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  return (
    <div className="mb-0 md:mb-8">
      <div className="bg-primary-350 pt-9 pb-12 w-full rounded-[10px] mt-6 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-12 text-white">
        <h1 className="text-lg font-bold lg:text-xl font-basement ">
          Profile Settings
        </h1>
        <div className="mt-6 flex flex-wrap gap-12 lg:gap-[110]">
          <div className="flex-1 min-w-[240px]">
            <Input label="Email" variant={"default"} />
          </div>
          <div className="flex-1 min-w-[240px]">
            <Input label="Username" variant={"default"} />
          </div>
        </div>
        <div className="flex flex-wrap gap-12 mt-8">
          <div className="flex-1 max-w-full lg:max-w-[48%]">
            <Input
              label="Wallet Address"
              variant={"copy"}
              buttonText="Copy"
              placeholder={"0x1234567890abcdef1234567890abcdef12345678"}
              readOnlyInput
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-12 lg:gap-[110]">
          <div className="flex-1 min-w-[240px] ">
            <h1 className="mb-3 text-lg font-bold font-basement lg:text-xl">
              Refer friends and get rewarded
            </h1>
            <Link
              href="#"
              onClick={open}
              className="text-sm outline-none font-basement hover:underline hover:text-secondary hover:cursor-pointer text-grey-550"
            >
              Click to see terms of the referral program
            </Link>
            <TermsConditionsModal openModal={isOpen} closeModal={close} />
            <div className="mt-5">
              <Input
                label="Your referral link"
                variant={"copy"}
                buttonText="Copy"
                readOnlyInput
                placeholder={"https://www.example.com/referral?code=123456"}
              />
            </div>
          </div>
          <div className="flex items-end justify-center flex-1 w-full gap-16 lg:justify-start ">
            <div>
              <p className="text-lg font-normal font-basement text-grey-550">
                Invites
              </p>
              <h1 className="text-base font-bold text-white font-basement lg:text-xl">
                10,900
              </h1>
            </div>
            <div>
              <p className="text-lg font-normal font-basement text-grey-550">
                Earned
              </p>
              <h1 className="text-base font-bold font-basement text-secondary lg:text-xl">
                $ 100k
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9">
        <WalletTabs />
      </div>
    </div>
  );
};
