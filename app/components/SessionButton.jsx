import { DiamondIcon } from "./Svgs";

export const SessionButton = ({
  title = "50/50",
  count = 5,
  mainStyles = "bg-gradient-to-r from-[#2e414e] to-[#132836]",
  badgeBg = "bg-success/30",
  titleStyles = "text-2xl",
  countSize = "text-2xl",
  diamondSize = { width: "28", height: "26" },
  svgFill = "#58FF69",
  hover,
  ...props
}) => {
  return (
    <div
      className={`transition  duration-200 ease-in-out rounded-[10px] ${mainStyles} pl-4 pt-2 pb-[12px] border border-[#051c2b] ${
        hover ? "hover:border-white" : ""
      }`}
      {...props}
    >
      <div>
        <h1 className={`font-basement font-bold ${titleStyles} text-white`}>
          {title}
        </h1>
      </div>
      <div
        className={`py-[6px] mt-[6px] flex items-center justify-center gap-4 rounded-full ${badgeBg} max-w-[106px]`}
      >
        <h1 className={`font-basement font-normal ${countSize} text-white`}>
          {count}
        </h1>
        <DiamondIcon
          width={diamondSize.width}
          height={diamondSize.height}
          fill={svgFill}
          className={"text-red-500"}
        />
      </div>
    </div>
  );
};
