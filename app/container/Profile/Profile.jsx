"use client";
import Input from "@/app/components/Input";
import WalletTabs from "@/app/components/WalletTabs";

export const Profile = () => {
  return (
    <div className="mb-8">
      <div className="bg-primary-350 pt-9 pb-12 w-full rounded-[10px] mt-6 pl-8 pr-12 text-white">
        <h1 className="text-lg lg:text-xl font-basement font-bold ">
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
        <div className="mt-8 flex flex-wrap gap-12">
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
            <h1 className="font-basement font-bold text-lg lg:text-xl mb-[26px]">
              Refer friends and get rewarded
            </h1>
            <Input
              label="Your referral link"
              variant={"copy"}
              buttonText="Copy"
              readOnlyInput
              placeholder={"https://www.example.com/referral?code=123456"}
            />
          </div>
          <div className="flex-1 flex gap-16 w-full items-end justify-center lg:justify-start ">
            <div>
              <p className="font-basement font-normal text-grey-550 text-lg">
                Invites
              </p>
              <h1 className="font-basement font-bold text-white text-base lg:text-xl">
                10,900
              </h1>
            </div>
            <div>
              <p className="font-basement font-normal text-grey-550 text-lg">
                Earned
              </p>
              <h1 className="font-basement font-bold text-secondary text-base lg:text-xl">
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
