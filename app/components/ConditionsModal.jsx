import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ModalCrossIcon } from "./Svgs";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/Brainz-logo.png";
import { Button } from "./Button";
import { CustomCheckbox } from "./Checkbox";

const ConditionsModal = ({
  isOpen,
  closeModal,
  onAccept,
  toggleNotification,
}) => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (checkedOne && checkedTwo) {
      onAccept();
      closeModal();
    }
  };
  const handleModalClose = () => {
    closeModal();
    toggleNotification();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={handleModalClose}>
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
              <Dialog.Panel className="w-full p-[16px] md:p-[0] max-w-[1176px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-350  text-left align-middle shadow-xl transition-all">
                <div className="md:h-[100%] h-[580px] py-4 pr-4 md:px-[50px] scrollbar scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-y-scroll">
                  <div className="flex flex-col justify-center items-center pt-[0] md:pt-7">
                    <Link href={"/"}>
                      <Image
                        src={logo}
                        alt="Logo"
                        width={104}
                        height={60}
                        draggable={false}
                        priority={true}
                      />
                    </Link>
                    <h1 className="font font-basement font-bold text-2xl md:text-3xl">
                      Terms & Conditions
                    </h1>
                    <p className="font-inter font-normal text-base text-grey-100">
                      You agree to our Terms of Use and License Terms.
                    </p>
                    <div className="text-grey-100 text-start rounded-[10px] pl-4 pr-[6px] py-3 mt-6  border border-[#51626e] ">
                      <div className="pr-[14px] h-[166px] scrollbar scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-y-scroll">
                        <p className="pb-6 font-inter">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. 
                        </p>
                        <h1 className="font-inter font-bold text-lg">
                          Title here:
                        </h1>
                        <p className="text-base font-inter font-normal">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s.
                        </p>
                        <h1 className="font-inter font-bold text-lg pt-6">
                          Title here:
                        </h1>
                        <p className="text-base font-inter font-normal">
                          When an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum has been the industrys standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen book.
                          specimen book. 
                        </p>
                        <p className="text-base font-inter font-normal">
                          When an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum has been the industrys standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen
                          book. Lorem Ipsum has been the industrys standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book.  Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum has been the industrys standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen
                          book.  type specimen book. 
                        </p>
                        <p className="text-base font-inter font-normal">
                          When an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum has been the industrys standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen
                          book. Lorem Ipsum has been the industrys standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book.  Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a Lorem Ipsum has been the
                          industrys standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.  Lorem
                          Ipsum has been the industrys standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen
                          book.  type specimen book. 
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleContinue}>
                      <div class="bg-primary-400 pl-4 pr-[36px] py-6 w-full mt-4 rounded-[10px]">
                        <div className=" relative flex items-center">
                          <CustomCheckbox
                            checked={checkedOne}
                            setChecked={setCheckedOne}
                          />
                          <div className="ml-[16px]">
                            <p className="font-inter font-normal text-start">
                              You agree to our Terms of Use and License Terms.
                              In our Privacy Policy, we explain how we process
                              your personal data and what rights you have.
                            </p>
                          </div>
                        </div>
                        <div className="relative flex items-center mt-9">
                          <CustomCheckbox
                            checked={checkedTwo}
                            setChecked={setCheckedTwo}
                          />
                          <div className="ml-[16px]">
                            <p className="font-inter font-normal text-start">
                              You agree to our Terms of Use and License Terms.
                              In our Privacy Policy, we explain how we process
                              your personal data and what rights you have.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-[40px] pb-[14px]">
                        <Button
                          type="submit"
                          variant={"outlined"}
                          size="text-xl"
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-[38px] right-[50px] "
                >
                  <ModalCrossIcon
                    className={"text-white hover:text-secondary cursor-pointer"}
                  />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConditionsModal;
