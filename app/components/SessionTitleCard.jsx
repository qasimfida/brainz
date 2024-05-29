import React from "react";
export default function SessionTitleCard({
  bgColor,
  title,
  description,
  number,
  noIcon,
  icon: IconComponent = () => <div />,
}) {
  return (
    <div
      className={`w-full h-full ${bgColor} rounded-[6px] pb-5 px-5 pt-5 lg:pt-7 lg:pb-9 lg:px-8`}
    >
      <div className="w-full flex justify-start items-center gap-3 ">
        <h1 className="font-basement font-bold text-lg lg:text-2xl capitalize font-basement ">
          {title}
        </h1>
        {noIcon ? null : (
          <div
            className={`px-3 bg-success/20 rounded-[80px] flex items-center justify-center gap-2 py-0.5`}
          >
            <p className="font-inter font-normal text-base lg:text-xl">
              {number}
            </p>
            <IconComponent height={16} width={16} className={"text-success"} />
          </div>
        )}
      </div>
      <p className="pt-4 font-inter font-normal text-sm sm:text-base md:text-lg text-white/60">
        {description}
      </p>
    </div>
  );
}
