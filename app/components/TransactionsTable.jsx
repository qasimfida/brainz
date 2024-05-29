import { useState } from "react";
import { LinkIcon } from "./Svgs";
import { RightSidebar } from "./TransactionsRightbar";
import { tableData } from "../container/Profile/data";

const TransactionsTable = () => {
  const [open, setOpen] = useState(false);
  // const handleRightBar = () => setOpen(true);

  return (
    <div className="scrollbar scrollbar-w-[3px] scrollbar-h-[5px] scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-x-scroll w-full">
      <table className="w-full text-white table-auto">
        <thead className="bg-primary">
          <tr className="h-[36px]">
            <th className="text-start pl-[20px] text-[14px] font-basement font-normal min-w-[200px]">
              Date
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-64">
              Title
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-56">
              Status
            </th>
            <th className="text-start text-[14px] font-basement font-normal min-w-20">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            const isPositive = item.amount.startsWith("+");
            const amountButtonClass = isPositive
              ? "bg-[#104838] text-[#30c551]"
              : "bg-danger-150/25 text-danger-150";

            return (
              <tr key={index} className="border-b border-primary-275">
                <td className="py-[20px] px-[20px] text-grey-600 text-lg font-inter font-medium text-nowrap">
                  {item.date}
                </td>
                <td className="text-grey-600 text-lg font-inter font-medium text-nowrap">
                  {item.title}
                </td>
                <td className="text-grey-600 text-lg font-inter font-medium text-nowrap">
                  {item.status}
                </td>
                <td align="start" className="pt-5 pb-3">
                  <div className="flex items-center gap-4">
                    <button
                      className={`${amountButtonClass} py-[8px] px-3 text-lg font-bold rounded-[10px] hover:opacity-80`}
                    >
                      {item.amount}
                    </button>
                    <button className="p-0 m-0">
                      <LinkIcon className="cursor-pointer hover:text-secondary" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <RightSidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default TransactionsTable;
