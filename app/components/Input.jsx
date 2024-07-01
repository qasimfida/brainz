"use client";
import React, { useState } from "react";
import { CheckCirclekIcon, GreyCheckIcon } from "./Svgs";

const Input = ({
  label,
  className,
  showCheckIcon,
  isSaved,
  showCopy,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between pl-[6px] pr-[18px]">
        <label className="font-inter font-medium text-sm lg:text-lg text-gray-550 pl-[6px]">
          {label}
        </label>
        {showCheckIcon && (
          <span
            className={`text-lg lg:text-xl ${
              isSaved ? "text-green-500" : "text-gray-500"
            }`}
          >
            {isSaved ? <CheckCirclekIcon /> : <GreyCheckIcon />}
          </span>
        )}
      </div>

      <div className="relative mt-3">
        <input
          {...props}
          className={`bg-primary w-full px-4  py-4 rounded-[20px] border border-primary-275 focus:outline-none focus:ring-1 ${className} ${
            showCopy && "pr-[100px]"
          } `}
        />
        {showCopy && (
          <button
            className="absolute right-0 bottom-2.5  h-max text-white py-2 px-6 rounded-md focus:outline-none"
            onClick={() => handleCopy(props.value)}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
