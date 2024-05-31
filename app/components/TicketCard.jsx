import React from "react";
import { Button } from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BtcIcon, EthIcon, ModalCrossIcon, UsdtIcon } from "./Svgs";
import PurchaseDropdown from "./PurchaseDropdown";

export const TicketCard = ({ tickets, icon: MainIcon, price, iconColor }) => {
  const [isPurchased, setIsPurchased] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const defaultOption = "ETH";
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const handlePurchase = () => {
    setIsPurchased(true);
  };

  const options = [
    { icon: <EthIcon height="18" width="18" />, price: 12.0503, label: "ETH" },
    { icon: <BtcIcon height="18" width="22" />, price: 44.0503, label: "BTC" },
  ];
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="bg-primary-350 rounded-[20px] border border-primary-275 py-5 px-[18px] text-center w-full">
      <div className="flex items-center justify-center gap-[10px]">
        <h1 className="text-xl lg:text-3xl font-basement font-bold">
          {tickets}
        </h1>
        <MainIcon className={iconColor} />
      </div>
      <p className="my-2 font-basement font-normal text-grey-400 text-sm">
        For
      </p>
      <h2 className="font-basement font-bold text-base lg:text-lg mt-2.5">
        {price}
      </h2>
      <div className="mt-[8px]">
        <Button
          variant={"outlined"}
          size="text-sm lg:text-base"
          className={"sm:px-5 py-1 md:px-6 lg:px-10"}
          onClick={openModal}
        >
          Buy now
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[724px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-275 py-6 px-6 md:px-12 text-left align-middle shadow-xl transition-all">
                  {isPurchased ? (
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-basement font-bold">
                        Buy
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-lg  md:text-2xl font-basement font-bold mt-6 md:mt-10 max-w-[458px]">
                          You are purchasing 25 Tickets for 120 USDT.
                        </h2>
                      </div>
                      <div className="flex justify-center mt-[140px] pb-8">
                        <p className="text-base md:text-lg font-basement font-normal max-w-[458px] ">
                          Your purchase was successful!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-[26px] md:text-4xl font-basement font-bold">
                        Buy
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-lg md:text-2xl font-basement font-bold mt-10 max-w-[458px]">
                          You are purchasing 25 Tickets for 120 USDT.
                        </h2>
                      </div>
                      <div className="flex justify-center mt-8">
                        <p className="text-sm md:text-base md:text-lg font-basement font-normal max-w-[458px] ">
                          Select USDT or Equivalen Token to purchase the bundles
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center mt-8">
                        <div className="w-[370px]">
                          <PurchaseDropdown
                            options={options}
                            onChange={handleSelectChange}
                            defaultOption={options[1].label}
                          />
                        </div>
                        <div className="w-[370px] mt-5">
                          <div className="flex items-center relative w-full focus:outline-none focus:shadow-outline">
                            <div className=" bg-primary w-full flex items-center font-basement justify-between py-3 px-6 md:px-8 border border-primary-275 rounded-[10px] ">
                              <div className="text-start flex flex-col rounded font-bold text-grey-200">
                                <p className="font-basement font-normal text-xs mb-[4px] uppercase">
                                  Equivalent
                                </p>
                                <h1 className="text-white text-sm md:text-base">
                                  0.123123
                                </h1>
                              </div>
                              <div className="text-white flex items-center uppercase	text-sm md:text-base ">
                                <span className="mr-2">
                                  <UsdtIcon />
                                </span>
                                USDT
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[48px] flex justify-center gap-[34px] ">
                        <Button variant={"outlined"} onClick={handlePurchase}>
                          Purchase
                        </Button>
                        <button
                          className="text-nowrap font-basement font-bold bg-transparent border border-white border-2 text-white font-bold py-2 rounded-full inline-flex items-center duration-200 hover:bg-white hover:text-dark px-[41px] py-[4px]"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={closeModal}
                    className="absolute top-[38px] right-[50px] "
                  >
                    <ModalCrossIcon
                      className={
                        "text-white hover:text-secondary cursor-pointer"
                      }
                    />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
