export const ProgressBar = ({ progress, step, rounded }) => {
  const headPosition = `${progress}%`;
  const borderRounded = rounded && `rounded-tl-lg rounded-bl-lg`;

  return (
    <div className="relative h-[5px] w-full ">
      <div
        className={`shadow-progressBar relative left-0 top-0 h-full bg-gradient-to-r from-secondary to-secondary-100  ${borderRounded}`}
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="flex justify-center text-xs font-extrabold font-inter absolute  h-[15px] w-[18px] bg-secondary-100 rounded-[40px] "
        // style={{ left: headPosition }}
        style={{
          left: `calc(${headPosition} - 7.5px)`,
          top: "-4.5px",
        }}
      >
        {step}
      </div>
    </div>
  );
};
