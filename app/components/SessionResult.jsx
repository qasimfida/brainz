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
  const [remainingWheelTime, setRemainingWheelTime] = useState(
    session.wheelDuration
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingWheelTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [showWheel, setShowWheel] = useState(false);

  return (
    <div className="content">
      <ConfettiBackground />
      <div className="flex flex-wrap gap-6 lg:gap-16 border-secondary">
        <div className="flex-1 text-center lg:text-start">
          <div
            className={
              "pt-4 lg:pt-4 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-12 rounded-[10px] h-full w-full text-nowrap bg-gradient-to-r from-[#3a4d56]/90 to-[#152c3a]"
            }
          >
            <h1
              className={`font-basement font-bold text-lg lg:text-xl text-white	tracking-wider	 mb-4`}
            >
              You Ranked{" "}
              <span className="text-secondary uppercase">
                {leaderboard.currentUser.rank}
                {leaderboard.currentUser.rank === 1
                  ? "st"
                  : leaderboard.currentUser.rank === 2
                  ? "nd"
                  : leaderboard.currentUser.rank === 3
                  ? "rd"
                  : "th"}
              </span>
            </h1>
            <h1
              className={`font-basement font-bold text-lg lg:text-xl text-white	tracking-wider	 mb-4`}
            >
              Your Points{" "}
              <span className="text-secondary uppercase">
                {leaderboard.currentUser.totalPoints}
              </span>
            </h1>
            <h1
              className={`font-basement font-bold text-lg lg:text-xl text-white	tracking-wider	 `}
            >
              Correct Answers{" "}
              <span className="text-secondary uppercase">
                {leaderboard.currentUser.totalPoints}
              </span>
              /{session.totalQuestions}
            </h1>
          </div>
        </div>
        <div className="flex-1 text-center lg:text-start">
          <ResultCard
            title="Reward"
            details="Result Details"
            variant="secondary"
          />
        </div>
        <div className="flex-1 text-center lg:text-start">
          <div
            className={
              "pt-4 lg:pt-4 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-12 rounded-[10px] h-full w-full text-nowrap bg-gradient-to-r from-[#3a4d56]/90 to-[#152c3a]"
            }
          >
            <h1
              className={`font-basement font-bold text-lg lg:text-xl text-white	tracking-wider	 mb-4`}
            >
              Spin the wheel{" "}
            </h1>
            <h1
              className={`font-basement font-bold text-xl lg:text-3xl text-white 	`}
            >
              25/{session.wheelDuration}
            </h1>
          </div>
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
