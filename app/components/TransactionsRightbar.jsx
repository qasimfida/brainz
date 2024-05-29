import { useEffect, useRef } from "react";
import { BankIcon, ModalCrossIcon } from "./Svgs";
import { Button } from "./Button";

export const RightSidebar = ({ open, setOpen }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div ref={sidebarRef} className="mr-[20px]">
      <div
        className={`scrollbar scrollbar-w-[10px] scrollbar-thumb-rounded-full scrollbar-thumb-primary overflow-y-scroll text-center fixed top-0 right-0 h-full w-[512px] bg-primary-375 text-white px-[54px] pt-[60px] transition-transform transform ${
          open ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <div>
          <h1 className="font-inter font-[800] text-[26px]">
            Transaction Details
          </h1>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-[36px] right-[50px] text-2xl focus:outline-none"
          >
            <ModalCrossIcon height="19" width="19" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-14 border-b border-grey pb-6">
          <div className=" flex items-center justify-center border-[3px] border-secondary w-[120px] h-[120px] bg-primary-425 rounded-full">
            <BankIcon />
          </div>
          <h1 className="text-start mt-4 font-basement font-bold text-[34px] text-white">
            +25 USDT
          </h1>
          <h1 className="text-start mt-[6px] font-basement font-bold text-[22px] text-white">
            Completed
          </h1>
        </div>
        <h1 className="text-start mt-5 font-basement font-bold text-xl text-white">
          Transaction Details
        </h1>
        <div className="pb-[82px]">
          <div>
            <h1 className="font-inter font-bold text-start mt-5 font-basement font-bold text-lg text-white">
              Transaction ID:
            </h1>
            <p className="font-inter font-[600] text-start font-basement font-bold text-lg text-grey-600">
              656599538
            </p>
          </div>
          <div>
            <h1 className="font-inter font-bold text-start mt-5 font-basement font-bold text-lg text-white">
              Description:
            </h1>
            <p className="font-inter font-[600] text-start font-basement font-bold text-lg text-grey-600">
              Reward
            </p>
          </div>
          <div>
            <h1 className="font-inter font-bold text-start mt-5 font-basement font-bold text-lg text-white">
              Session & ID:
            </h1>
            <p className="font-inter font-[600] text-start font-basement font-bold text-lg text-grey-600">
              Cryto <br />
              545451454
            </p>
          </div>
          <div>
            <h1 className="font-inter font-bold text-start mt-5 font-basement font-bold text-lg text-white">
              Completed:
            </h1>
            <p className="font-inter font-[600] text-start font-basement font-bold text-lg text-grey-600">
              22 March, 2024
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mt-14">
            <h1 className="border-b pb-[4px] font-inter font-bold text-start mt-5 font-basement font-bold text-lg text-white">
              Session Details
            </h1>
            <Button variant={"outlined"} className={"mt-8"}>
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
