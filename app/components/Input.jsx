import React, { useState } from "react";
import { CheckCirclekIcon, GreyCheckIcon } from "./Svgs";

const Input = ({
  label,
  variant = "default", // Set default variant
  readOnlyInput = false,
  buttonText = "Save",
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsSaved(false); // Reset the saved status when input changes
  };

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      setIsSaved(true);
    }
  };

  const handleCopyed = () => {
    setIsSaved(true);
  };

  const showCheckIcon = variant === "default" || variant === "walletAddress";

  const showButton =
    variant === "copy" || variant === "change" || variant === "walletAddress";

  const handleButtonClick = () => {
    if (variant === "walletAddress") {
      handleCopyed();
    } else {
      handleSave();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between pl-[6px] pr-[18px]">
        <label className="font-inter font-medium text-sm lg:text-lg text-gray-550">
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
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          readOnly={readOnlyInput}
          placeholder={placeholder}
          className={`bg-primary w-full pl-4 pr-[110px] py-4 rounded-[20px] border border-primary-275 focus:outline-none focus:ring-1 ${
            readOnlyInput ? "text-gray-500" : ""
          }`}
        />
        {showButton && (
          <button
            onClick={handleButtonClick}
            className="absolute right-0 inset-y-0 text-white pr-[48px] bg-blue-500 py-2 px-4 rounded-md focus:outline-none"
          >
            {variant === "copy"
              ? "Copy"
              : variant === "change"
              ? "Change"
              : buttonText}
          </button>
        )}
        {!showButton && (
          <button
            onClick={handleSave}
            className="absolute right-0 inset-y-0 text-white pr-[48px] bg-blue-500 py-2 px-4 rounded-md focus:outline-none"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
