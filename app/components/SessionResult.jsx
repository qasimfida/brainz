import Link from "next/link";
import {
  fiveToTenUsersRankData,
  fiveUsersRankData,
} from "../container/Session/data";
import { Button } from "./Button";
import { Counter } from "./Counter";
import { PointsDetails } from "./PointsDetails";
import { ResultCard } from "./ResultCard";
import { ConfettiBackground } from "./ConfettiBackground ";

export const SessionResult = () => {
  return (
    <div className="content">
      <ConfettiBackground />
      <div className="flex flex-wrap gap-10 lg:gap-16 border-secondary">
        <div className="flex-1 text-center lg:text-start">
          <ResultCard
            title="You ranked"
            details="Congratulations"
            rankNum="10th"
          />
        </div>
        <div className="flex-1 text-center lg:text-start">
          <ResultCard
            title="Reward"
            details="Result Details"
            variant="secondary"
          />
        </div>
        <div className="flex-1 text-center lg:text-start">
          <ResultCard
            title="Correct Answers"
            details="01 Ticket"
            variant="primary"
            correctAnswer={15}
          />
        </div>
      </div>
      <div className="flex-col lg:flex-row flex flex-wrap gap-10 lg:gap-16 justify-center bg-gradient-to-r from-[#3a4d56]/80 to-[#152c3a]/90 rounded-[10px] mt-10 py-6 lg:py-11 px-6">
        <div className="flex-1 items-center flex">
          <h1 className="w-full text-base text-center lg:text-start  lg:text-3xl font-black text-white font-basement">
            Next Session Starting in
          </h1>
        </div>
        <div className="flex-1 items-center flex ">
          <Counter hours={2} minutes={1} seconds={34} />
        </div>
        <div className="flex-1 flex flex-wrap flex-row lg:flex-col items-center justify-center gap-4 lg:gap-8 ">
          <div className="flex flex-col justify-center items-center">
            <Link href={"/dashboard/session"} className="flex justify-center">
              <Button
                variant={"outlined"}
                size="text-base lg:text-2xl"
                className={"px-[24px] lg:px-9 w-fit"}
              >
                Take a seat
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link href={"/dashboard"} className="w-fit">
              <Button
                variant={"outlinedWhite"}
                size="text-base lg:text-2xl"
                className={"px-[48px] lg:px-[76px]"}
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl lg:text-4xl font-black text-white font-basement">
          Participants (122)
        </h2>
        <div className="mt-5 lg:mt-9 h-[370px] cursor-grab active:cursor-grabbing	 scrollbar scrollbar-w-[5.6px] scrollbar-h-[5.6px] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thumb-[#104061]">
          <div className="flex flex-wrap justify-between gap-0 lg:gap-14">
            <div className="flex-1">
              {fiveUsersRankData.map((rank, index) => (
                <PointsDetails
                  key={index}
                  rank={rank.rank}
                  userName={rank.userName}
                  points={rank.points}
                  profileImage={rank.profileImage}
                  reward={rank.reward}
                  myRank={rank.myRank}
                  bgColorGrey
                  showWinnerIcon
                />
              ))}
            </div>
            <div className="flex-1">
              {fiveToTenUsersRankData.map((rank, index) => (
                <PointsDetails
                  key={index}
                  rank={rank.rank}
                  userName={rank.userName}
                  points={rank.points}
                  profileImage={rank.profileImage}
                  reward={rank.reward}
                  myRank={rank.myRank}
                  bgColorGrey
                  showWinnerIcon
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
