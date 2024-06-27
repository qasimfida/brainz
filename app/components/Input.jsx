import React, { useState } from "react";

const Input = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="font-inter font-medium text-sm lg:text-lg text-gray-550  pl-[6px]">
        {label}
      </label>

      <div className="relative mt-3">
        <input
          {...props}
          className={`bg-primary w-full px-4  py-4 rounded-[20px] border border-primary-275 focus:outline-none focus:ring-1 ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
