import React from "react";
import { Button } from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  BtcIcon,
  DiamondIcon,
  EthIcon,
  ModalCrossIcon,
  TicketIcon,
  UsdtIcon,
} from "./Svgs";
import PurchaseDropdown from "./PurchaseDropdown";
import { useWallet } from "../contexts/WalletContext";
import { ethers } from "ethers";
import TokenSelectDropdown from "./TokenSelectDropdown";

export const TicketCard = ({ ticketAmount, diamondAmount, price }) => {
  const { walletBalances } = useWallet();
  const [isPurchased, setIsPurchased] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("USDT");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const handlePurchase = async () => {
    await sendTransaction();
  };

  const handleTokenChange = (value) => {
    setSelectedOption(value.symbol);
  };

  const { signer } = useWallet();

  const sendTransaction = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to: "0x55d398326f99059ff775485246999027b3197955",
        value: ethers.utils.parseEther("20"),
      });

      const receipt = await tx.wait();
      // setTxHash(receipt.transactionHash);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div className="bg-primary-350 rounded-[20px] border border-primary-275 py-5 px-[18px] text-center w-full">
      <div className="flex items-center justify-center gap-5">
        {ticketAmount > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            <h1 className="text-xl lg:text-3xl font-basement font-bold">
              {ticketAmount}
            </h1>
            <TicketIcon className={"text-danger-100"} />
          </div>
        )}
        {diamondAmount > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            <h1 className="text-xl lg:text-3xl font-basement font-bold">
              {diamondAmount}
            </h1>
            <DiamondIcon className={"text-success"} />
          </div>
        )}
      </div>
      <p className="my-2 font-basement font-normal text-grey-400 text-sm">
        For
      </p>
      <h2 className="font-basement font-bold text-base lg:text-lg mt-2.5">
        {price} USDT
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
                <Dialog.Panel className="w-full max-w-[724px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-275 py-6 px-6 md:px-12  align-middle shadow-xl transition-all">
                  {isPurchased ? (
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-basement font-bold">
                        Buy
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-lg  md:text-2xl font-basement font-bold mt-6 md:mt-10 max-w-[458px]">
                          You purchased
                          {ticketAmount > 0 && (
                            <span>
                              {ticketAmount}{" "}
                              <TicketIcon className={"text-danger-100"} />
                            </span>
                          )}
                          {diamondAmount > 0 && (
                            <span>
                              {diamondAmount}{" "}
                              <DiamondIcon className={"text-success"} />
                            </span>
                          )}
                          for {price} USDT.
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
                          You are purchasing{" "}
                          {ticketAmount > 0 && (
                            <span>{ticketAmount} tickets</span>
                          )}
                          {diamondAmount > 0 && (
                            <span> {diamondAmount} diamonds </span>
                          )}
                          for {price} USDT.
                        </h2>
                      </div>
                      <div className="flex justify-center mt-8">
                        <p className="text-sm e md:text-lg font-basement font-normal max-w-[458px] ">
                          Select USDT or Equivalent Token to purchase the
                          bundles
                        </p>
                      </div>
                      <div className="flex items-start justify-between max-w-xs mx-auto text-left mt-5">
                        <div className="flex flex-col gap-3">
                          <p>You pay</p>
                          <h1 className="font-bold font-basement text-3xl">
                            {price}
                          </h1>
                        </div>
                        <div className="flex flex-col gap-3">
                          <p>
                            Balance:{" "}
                            {
                              walletBalances.find(
                                (balance) => balance.symbol === selectedOption
                              )?.balance
                            }
                          </p>
                          <div>
                            <TokenSelectDropdown
                              options={walletBalances}
                                onChange={handleTokenChange}
                                className={"max-h-28 "}
                            />
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
