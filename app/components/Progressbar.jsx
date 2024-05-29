export const ProgressBar = ({ progress, rounded }) => {
  const headPosition = `${progress}%`;
  const borderRounded = rounded && `rounded-tl-lg rounded-bl-lg`;

  return (
    <div className="relative h-[5px] w-full">
      <div
        className={`absolute left-0 top-0 h-full bg-secondary  ${borderRounded}`}
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="absolute top-[-1.5px] h-[8px] w-[10px] bg-secondary rounded-[1px] "
        style={{ left: headPosition }}
      ></div>
    </div>
  );
};
