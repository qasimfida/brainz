import React, { useState, useRef, useEffect } from "react";
import { ArrowDownLightIcon, ArrowIcon, WalletIcon } from "./Svgs";

const MobileSelectDropdown = ({ options, onChange, defaultOption = "ETH" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`   ${
          isOpen ? "bg-primary-275" : "bg-primary-350"
        } flex items-center relative w-full border border-primary-275 rounded-lg py-2 pl-2.5 pr-4 focus:shadow-outline z-[11] hover:bg-primary-275 transition duration-200 
         `}
      >
        <div className="flex justify-between items-center w-full">
          <div className="bg-primary w-[270px] flex justify-between items-center py-2.5 px-3 rounded mr-2.5 font-bold text-grey-200">
            <span className="mr-2">
              {selectedOption.icon || options[0].icon}
            </span>
            <p className="mr-2 font-sm">
              {selectedOption.price || options[0].price}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-white text-base">
              {selectedOption.label || options[0].label}
            </p>
            <div className="ml-2.5">
              <ArrowDownLightIcon className={"text-grey-300"} />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 -mt-1 w-full bg-dark-100 text-grey-200 rounded shadow-lg px-[8px]">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={` px-4 py-2 hover:text-white  ${
                index === options.length - 1
                  ? "border-b-0 "
                  : "border-b-[0.5px] border-grey-200"
              }`}
            >
              <div className="flex justify-between items-center pb-2 pt-2.5">
                <div className="flex font-basement font-normal">
                  <span>{option.icon}</span>
                  <p className="ml-2 text-sm">{option.price}</p>
                </div>
                <p className="text-sm">{option.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileSelectDropdown;
