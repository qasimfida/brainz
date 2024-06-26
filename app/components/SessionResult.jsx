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

export const SessionResult = ({ leaderboard, session }) => {
  return (
    <div className="content">
      <ConfettiBackground />
      <div className="flex flex-wrap gap-6 lg:gap-16 border-secondary">
        <div className="flex-1 text-center lg:text-start">
          <ResultCard
            title="You ranked"
            details="Congratulations"
            rankNum={leaderboard.currentUser.rank}
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
            totalQuestions={session.totalQuestions}
          />
        </div>
      </div>
      <div className="flex-col lg:flex-row flex flex-wrap gap-10 lg:gap-16 justify-center bg-gradient-to-r from-[#3a4d56]/80 to-[#152c3a]/90 rounded-[10px] mt-6 lg:mt-10 py-4 lg:py-11 px-4 lg:px-6">
        <div className="flex-1 items-center flex">
          <h1 className="w-full text-lg text-center lg:text-start  lg:text-3xl font-black text-white font-basement">
            Next Session Starting in
          </h1>
        </div>
        <div className="flex-1 items-center flex ">
          <Counter hours={2} minutes={1} seconds={34} />
        </div>
        <div className="flex-1 flex flex-wrap flex-row lg:flex-col items-center justify-center gap-4 lg:gap-8 ">
          <div className="flex gap-4 justify-center flex-row lg:flex-col items-center">
            <Link href={"/dashboard/session"} className="flex justify-center">
              <Button
                variant={"outlined"}
                size="text-sm lg:text-2xl"
                className={"px-6 lg:px-9 w-full"}
              >
                Take a seat
              </Button>
            </Link>
            <Link href={"/dashboard"} className="w-full">
              <Button
                variant={"outlinedWhite"}
                size="text-sm lg:text-2xl"
                className={"w-full px-12 lg:px-9"}
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
              {leaderboard.top10.slice(0, 5).map((user, index) => (
                <PointsDetails
                  key={index}
                  rank={user.rank}
                  userName={user.username.slice(0, 10)}
                  points={user.totalPoints}
                  // profileImage={rank.profileImage}
                  // reward={rank.reward}
                  myRank={leaderboard.currentUser.rank}
                  bgColorGrey
                  showWinnerIcon
                />
              ))}
            </div>
            <div className="flex-1">
              {leaderboard.top10.slice(5, 10).map((user, index) => (
                <PointsDetails
                  key={index}
                  rank={user.rank}
                  userName={user.username.slice(0, 10)}
                  points={user.totalPoints}
                  // profileImage={rank.profileImage}
                  // reward={rank.reward}
                  myRank={leaderboard.currentUser.rank}
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
