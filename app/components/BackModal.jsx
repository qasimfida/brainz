import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ModalCrossIcon, WarningIcon } from "./Svgs";
import { Button } from "./Button";
import Link from "next/link";

const BackModal = ({ showModal, setShowModal, onCancel, onContinue }) => {
  if (!showModal) return null;

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 "
        onClose={() => setShowModal(false)}
      >
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
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[724px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-275 pb-6 md:pb-[48px] pt-[30px] md:pt-[90px] px-6 md:px-[86px] md:px-[50px] text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-center">
                  <div className="block md:hidden">
                    <WarningIcon width="50" height="50" />
                  </div>
                  <div className="hidden md:block">
                    <WarningIcon />
                  </div>
                </div>
                <h2 className="mt-5 text-lg font-medium md:mt-10 font-basement md:text-2xl">
                  If you leave the page you will lose your spot and your ticket
                  will not be refunded.
                </h2>
                <div className="w-full flex-wrap mt-5 justify-center items-center flex gap-4 md:gap-[42px]">
                  <Button variant={"outlined"} onClick={onContinue}>
                    Continue
                  </Button>
                  <Link href={"/dashboard"}>
                    <Button
                      variant={"outlinedWhite"}
                      className={"w-[232px]"}
                      onClick={onCancel}
                    >
                      Leave Session
                    </Button>
                  </Link>
                </div>
                <button
                  className="absolute top-[38px] right-[38px] cursor-pointer hover:text-secondary"
                  onClick={() => setShowModal(false)}
                >
                  <ModalCrossIcon />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BackModal;
