import React from "react";

export const ImageSkeleton = ({
  width = "100%",
  height,
  pulseWidth = "w-16",
  ...props
}) => {
  return (
    <div
      className={`${width} ${height} bg-gray-100 rounded-[20px] animate-pulse relative overflow-hidden`}
      {...props}
    >
      <div
        className={`absolute bg-white blur-sm h-full jutify-center wave ${pulseWidth}`}
      ></div>
    </div>
  );
};
