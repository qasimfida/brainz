import React, { useState, useRef, useEffect } from "react";
import { ArrowDownLightIcon, WalletIcon } from "./Svgs";

const SelectDropdown = ({
  options,
  onChange,
  defaultOption = "ETH",
  ...rest
}) => {
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
    <div className="relative cursor-pointer " ref={dropdownRef} {...rest}>
      <div
        onClick={toggleDropdown}
        className={`   ${
          isOpen ? "bg-primary-275" : "bg-primary-350"
        } flex items-center relative w-full border border-primary-275 rounded-lg py-2 pl-2.5 pr-4 focus:shadow-outline z-[11] hover:bg-primary-275 transition duration-200 
         `}
      >
        <div className="flex items-center font-basement">
          <div className="bg-primary flex items-center py-1.5 px-2 rounded mr-2.5 font-bold text-grey-200">
            <span className="mr-2">
              {selectedOption.icon || options[0].icon}
            </span>
            <p className="mr-2 text-sm">
              {selectedOption.price || options[0].price}
            </p>
          </div>
          <p className="text-white text-sm">
            {selectedOption.label || options[0].label}
          </p>
        </div>

        <div className="ml-4">
          <ArrowDownLightIcon className={"text-grey-300"} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full px-2 mt-[5px] rounded-lg	shadow-lg bg-dark-100 text-grey-200">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`py-2 hover:text-white  ${
                index === options.length - 1
                  ? "border-b-0 "
                  : "border-b-[0.5px] border-grey-200"
              }`}
            >
              <div className="flex items-center pb-2 pt-2.5 justify-around">
                <div className="flex font-normal font-basement">
                  <span>{option.icon}</span>
                  <p className="ml-2 text-sm">{option.price}</p>
                </div>
                <p className="text-sm">{option.label}</p>
                <div className="flex items-center justify-center w-6 h-6 p-1 rounded bg-primary-225">
                  <WalletIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
