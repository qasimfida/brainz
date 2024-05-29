import { useState } from "react";
import { LinkIcon } from "./Svgs";
import { RightSidebar } from "./TransactionsRightbar";

const TransactionsTable = () => {
  const [open, setOpen] = useState(false);

  const handleRightBar = () => {
    setOpen(true); // Directly set the state to open the sidebar
  };

  return (
    <div className="scrollbar scrollbar-w-[3px] scrollbar-h-[3.5px]  scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-x-scroll w-full ">
      <table className="w-full text-white table-auto">
        <thead className="bg-primary">
          <tr className="py-2.5 h-[36px]">
            <th className="text-start pl-[20px] text-[14px] font-basement font-normal min-w-[200px]">
              Date
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-64">
              Title
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-56">
              Status
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-28">
              Amount
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-10"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="py-[20px] px-[20px] border-b border-primary-275">
            <td className="py-[20px] px-[20px] text-grey-600 text-lg font-inter font-medium text-nowrap	">
              22 March 2024
            </td>
            <td className="text-grey-600 text-lg font-inter font-medium text-nowrap	">
              Reward
            </td>
            <td className="text-grey-600 text-lg font-inter font-medium text-nowrap	">
              Completed
            </td>
            <td className="text-center ">
              <div className="text-center flex items-center gap-4 justify-between">
                <button className="py-[8px] px-3 bg-[#104838] text-[#30c551] text-lg font-bold rounded-[10px] hover:opacity-75">
                  +25USDT
                </button>
              </div>
            </td>
            <td>
              <button className="p-0">
                <LinkIcon className={"cursor-pointer hover:text-secondary"} />
              </button>
            </td>
          </tr>
          <tr className="py-[20px] px-[20px] border-b border-primary-275">
            <td className="py-[20px] px-[20px]">22 March 2024</td>
            <td>Reward</td>
            <td>Completed</td>
            <td className="text-center">
              <div className="flex items-center justify-between text-center">
                <button className="py-[8px] px-3 bg-[#104838] text-[#30c551] text-lg font-bold rounded-[10px] hover:opacity-75">
                  +25USDT
                </button>
              </div>
            </td>
            <td>
              <button className="p-0">
                <LinkIcon className={"cursor-pointer hover:text-secondary"} />
              </button>
            </td>
          </tr>
          <tr className="py-[20px] px-[20px] border-b border-primary-275">
            <td className="py-[20px] px-[20px]">22 March 2024</td>
            <td>Reward</td>
            <td>Completed</td>
            <td className="text-center">
              <div className="flex items-center justify-between text-center">
                <button className="py-[8px] px-3 bg-[#104838] text-[#30c551] text-lg font-bold rounded-[10px] hover:opacity-75">
                  +25USDT
                </button>
              </div>
            </td>
            <td>
              <button className="p-0">
                <LinkIcon className={"cursor-pointer hover:text-secondary"} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <RightSidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default TransactionsTable;
