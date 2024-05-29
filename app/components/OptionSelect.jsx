import React from "react";

export const OptionSelect = ({
  alphabet = "A",
  description = "Lorem ipsum dolor sit amet, consectur.",
  variant = "default",
  answer = false,
  isActive = false,
  ...rest
}) => {
  let backgroundColor, borderColor;

  switch (variant) {
    case "success":
      backgroundColor = answer ? "bg-[#207E35]" : "bg-[#8D4343]";
      borderColor = answer ? "border-[#0D3616]" : "border-[#532C2C]";
      break;
    case "danger":
      backgroundColor = "bg-[#8D4343]";
      borderColor = answer ? "border-[#0D3616]" : "border-[#532C2C]";
      break;
    default:
      backgroundColor = isActive ? "bg-secondary" : "bg-primary-350";
      borderColor = "border-primary-375";
      break;
  }

  return (
    <div
      {...rest}
      className={`flex items-center gap-5 ${backgroundColor} ${borderColor} ${
        isActive ? "" : "hover:bg-[#0A3049]"
      }  hover:border-[#C2CBD1] w-full rounded-[28px] border border-[1px] py-[8px] px-[20px]`}
    >
      <div className="py-2.5 px-[18px] flex items-center justify-center bg-primary text-white rounded-[8px] border border-primary-375">
        <h1 className="text-xl font-basement font-normal">{alphabet}</h1>
      </div>
      <p className="text-lg md:text-xl font-basement font-normal  text-white">
        {description}
      </p>
    </div>
  );
};
