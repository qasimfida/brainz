import Image from "next/image";
import { WinnerDarkIcon, WinnerIcon } from "./Svgs";

export const PointsDetails = ({
  rank = "01",
  userName = "User9850",
  points = "5 pts",
  reward = "",
  profileImage,
  showwinnericon = false,
  ranked = false,
  bgColorGrey,
  myRank,
  participants,
  ...rest
}) => {
  const ActiveRankStyles = myRank
    ? "items-center bg-[#FFE61A] pb-[10px] pt-2.5 border-none rounded-[8px]"
    : "";

  const bgGreyStyles =
    bgColorGrey &&
    "items-center bg-[#344653] pb-[14px] pt-[14px] px-[20px] lg:px-[28px] border-none rounded-[8px]";

  const textStyles =
    ranked || myRank ? "font-basement font-bold text-dark" : "text-white ";
  const rankNumStyles = ranked || myRank ? "text-dark" : "text-white";
  return (
    <div
      className={`w-full mb-[16px] flex justify-between px-3 items-center pb-[10px] border-b border-grey-475 ${ActiveRankStyles} ${bgGreyStyles} ${
        !showwinnericon && "pl-[38px]"
      } `}
      {...rest}
    >
      <div className="flex items-center gap-[6px] mr-[26px]">
        {myRank && !participants && <WinnerDarkIcon />}
        {showwinnericon && !myRank && (
          <WinnerIcon className={"text-secondary"} />
        )}
        <h1 className={`font-basement font-bold text-base ${rankNumStyles}`}>
          {rank}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="relative w-[24px] h-[24px] rounded-full border border-secondary">
          <Image
            src={profileImage}
            alt="profile"
            layout="fill"
            className="rounded-full"
            draggable={false}
            priority={true}
          />
        </div>
        <h1
          className={`font-basement font-bold text-sm lg:text-base text-nowrap	 ${textStyles}`}
        >
          {userName}
        </h1>
      </div>
      <div className="flex items-center justify-center ml-[44px] ">
        <p
          className={`font-basement text-sm lg:text-base font-bold text-nowrap	 ${textStyles}`}
        >
          {points}
        </p>
      </div>
      {!participants && (
        <div className="flex items-center justify-center ml-[44px]">
          <p
            className={`font-bold font-basement text-sm lg:text-base text-nowrap	 ${textStyles}`}
          >
            Reward: {reward}
          </p>
        </div>
      )}
    </div>
  );
};
