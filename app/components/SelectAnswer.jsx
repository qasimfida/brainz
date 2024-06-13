import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { OptionSelect } from "./OptionSelect";
import { LongArrowRightIcon } from "./Svgs";
import { SessionButton } from "./SessionButton";

import {
  mobileScreenUsersRankData,
  usersRankData,
} from "../container/Session/data";
import { ProgressBar } from "./Progressbar";
import { MobilePointsCard } from "./MobilePointsCard";
import { ParticipationsRankTable } from "./ParticipationsRankTable";
import { GameCarousel } from "./GameCarousel";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";
import clickSound from "@/public/sounds/anwer-select-sound.wav";
import alertSound from "@/public/sounds/new-question-alert-sound.wav";

const alphabets = ["A", "B", "C", "D"];
const loading_time = 8;

export const SelectAnswer = ({
  setSelectedOption,
  questions = [],
  step = 0,
  handleStageChange,
  handleQuestionChange,
  progress,
}) => {
  const question = useMemo(
    () => questions[step] || { choices: [] },
    [questions, step]
  );

  const [audio] = useState(new Audio(clickSound));
  const [table, setTable] = useState(usersRankData);
  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(loading_time);
  const [nextState, setNextState] = useState(false);
  const [optionSelectedState, setOptionSelectedState] = useState(false);
  const [alertAudio] = useState(new Audio(alertSound));

  useEffect(() => {
    if (question.time && !question.answer) {
      setTimeRemaining(question.time);
    }
  }, [question]);

  const moveUser = (currentIndex, targetIndex, data) => {
    if (currentIndex >= targetIndex && currentIndex >= 0 && targetIndex >= 0) {
      const user = data[currentIndex];
      const updatedTable = [
        ...data.slice(0, currentIndex),
        ...data.slice(currentIndex + 1),
      ];
      console.log({ updatedTable });
      const newTable = [
        ...updatedTable.slice(0, currentIndex - 1),
        user,
        ...updatedTable.slice(currentIndex - 1),
      ];

      setTable(newTable);

      if (currentIndex > targetIndex) {
        setTimeout(() => {
          moveUser(currentIndex - 1, targetIndex, newTable);
        }, 100);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        const userIndex = table.findIndex((user) => user.id === 11);
        moveUser(userIndex, 3, table);
        setNextState(true);
        // setTimeout(() => {
        //   if (question.id >= questions.length) {
        //     handleStageChange();
        //   } else {
        //     handleQuestionChange();
        //   }
        // }, loading_time * 1000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, handleQuestionChange, handleStageChange, moveUser]);

  useEffect(() => {
    if (timeRemaining === 0 && nextState) {
      const timer = setTimeout(() => {
        if (loadingTime === 0 || (loadingTime === 3 && question.stop)) {
          setOptionSelectedState(false);
          if (question.id >= questions.length) {
            handleStageChange();
          } else {
            handleQuestionChange();
          }
          setNextState(false);
          setLoadingTime(loading_time);
        } else {
          setLoadingTime((prevTime) => prevTime - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeRemaining, handleQuestionChange, handleStageChange, moveUser]);

  const getOptionVariant = (answer, wrong) => {
    if (timeRemaining > 0) return "default";
    return answer ? "success" : wrong ? "danger" : "default";
  };

  const playClickSound = () => {
    audio.currentTime = 0;
    audio.play();
  };

  const onAnswerSelect = (answer) => {
    if (!question.answer) {
      playClickSound();
      setSelectedOption(answer);
      setOptionSelectedState(true);
    }
  };

  // if (timeRemaining === 0) {
  //   alertAudio.play();
  // }

  return (
    <div className="pb-4">
      <div className="block mb-8 md:hidden bg-primary-350">
        <div className="px-5 pt-7 pb-3.5">
          <div className="flex items-center justify-between w-full gap-4 mb-5 text-4xl rounded-lg ">
            <h1 className="text-xl font-bold text-white font-basement max-w-36">
              Title of the Session
            </h1>
            <h1
              className={`text-2xl font-bold text-white font-basement  ${
                (timeRemaining > 0 && timeRemaining < 5) ||
                (loadingTime < 4 && !question.stop)
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {question.stop && timeRemaining === 0
                ? "Complete"
                : timeRemaining === 0
                ? loadingTime
                : timeRemaining - 1}{" "}
              {question.stop && timeRemaining === 0 ? "" : "s"}
            </h1>
          </div>
          <GameCarousel autoplay={false}>
            {mobileScreenUsersRankData.map((item, index) => {
              return <MobilePointsCard data={item} key={index} />;
            })}
          </GameCarousel>
        </div>
        <div className="relative pr-1.5 -bottom-1">
          <ProgressBar progress={progress} rounded step={step + 1} />
        </div>
      </div>
      <div className="flex flex-col gap-16 pl-4 pr-4 lg:flex-row md:pl-14 md:pr-9 bg-primary">
        <div className="w-full lg:w-3/4 ">
          <div className="flex items-center gap-4 md:gap-5">
            <div className=" w-[200px] lg:w-[234px]">
              <SessionButton
                title="50/50"
                count={7}
                mainStyles="bg-gradient-to-r from-[#2e414e] to-[#132836]"
                badgeBg="bg-success/20"
                titleStyles="text-base md:text-xl"
                countSize="text-base"
                hover
              />
            </div>
            {/* Desktop session button */}
            <div className="hidden md:block w-[200px] lg:w-[234px]">
              <SessionButton
                title="Auto-correct"
                svgFill="#1b5d3b"
                count={8}
                mainStyles="bg-gradient-to-r from-[#2e414e]/20 to-[#132836]/10"
                badgeBg="bg-success/5"
                titleStyles="text-base md:text-xl text-white/20"
                countSize="text-base text-white/10 "
              />
            </div>
            {/* Mobile session button */}
            <div className="w-[200px] block md:hidden">
              <SessionButton
                title="Auto-correct"
                count={10}
                mainStyles="bg-gradient-to-r from-[#2e414e] to-[#132836]"
                badgeBg="bg-success/20"
                titleStyles="text-base md:text-xl"
                countSize="text-base"
                hover
              />
            </div>
          </div>
          <div className="max-w-[830px] mt-7 md:mt-12">
            {loadingTime < 4 && !question.stop ? (
              <div>
                <Skeleton count={1} height={64} borderRadius={"1rem"} />
              </div>
            ) : (
              <div className="flex gap-4 text-white text-start">
                <div className="flex items-center hidden gap-4 md:flex ">
                  <h1 className="text-lg font-bold lg:text-xl font-basement text-secondary">
                    {step + 1}
                  </h1>
                  <div className="hidden md:block">
                    <LongArrowRightIcon height="24" width="24" />
                  </div>
                </div>
                <p className="pl-2 text-lg font-semibold md:text-xl lg:text-2xl font-inter md:pl-0">
                  {question.question}
                </p>
              </div>
            )}
          </div>

          <div className="pb-5 md:pb-0 flex flex-col mt-6 lg:mt-11 gap-4 max-w-[784px]">
            {loadingTime < 4 && !question.stop ? (
              <>
                <div className="hidden md:block">
                  <Skeleton
                    count={4}
                    height={64}
                    borderRadius={"1rem"}
                    style={{ marginBottom: "1rem" }}
                  />
                </div>
                <div className="md:hidden">
                  <Skeleton
                    count={4}
                    height={48}
                    borderRadius={"1rem"}
                    style={{ marginBottom: "1rem" }}
                  />
                </div>
              </>
            ) : (
              question.choices.map((choice, index) => {
                return (
                  <OptionSelect
                    key={index}
                    alphabet={alphabets[index]}
                    description={choice}
                    isActive={question.answer === choice}
                    variant={getOptionVariant(
                      question.correctAnswer === choice,
                      question.answer === choice &&
                        question.answer !== question.correctAnswer
                    )}
                    optionSelected={optionSelectedState}
                    answer={timeRemaining === 0 && true}
                    onClick={() => onAnswerSelect(choice)}
                  />
                );
              })
            )}
            {/* <OptionSelect
              alphabet="B"
              description="This is the danger variant with answer false."
              variant={getOptionVariant(false)}
              answer={optionsState === "showOptions" && false}
              onClick={() => setSelectedOption('')}
            />
            <OptionSelect
              alphabet="C"
              description="This is the default variant."
              variant="default"
              answer={false}
              onClick={() => setSelectedOption('')}
            /> */}
          </div>
          <div className="hidden md:flex flex items-center justify-center rounded-lg mt-16 bg-dark-200 h-[166px]">
            <h1 className="text-base font-normal uppercase font-basement text-grey-525">
              AD PLACEMENT SPACE
            </h1>
          </div>
        </div>
        <div className="hidden md:block w-full lg:w-[344px] space-y-6 block ">
          <div className="flex flex-col w-full text-4xl bg-gradient-to-r from-[#2e414e] to-[#132836] rounded-lg py-4 px-6">
            <p className="text-lg font-normal font-basement text-secondary">
              {question.stop && timeRemaining === 0
                ? ""
                : timeRemaining === 0
                ? "Next question in"
                : "Time remaining"}
            </p>
            <h1
              className={`text-3xl font-bold text-white font-basement ${
                (timeRemaining > 0 && timeRemaining < 5) ||
                (loadingTime < 4 && !question.stop)
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {question.stop && timeRemaining === 0
                ? "Complete"
                : timeRemaining === 0
                ? loadingTime
                : timeRemaining - 1}{" "}
              {question.stop && timeRemaining === 0 ? "" : "seconds"}
            </h1>
          </div>
          <div className="px-3 pt-5 bg-gradient-to-b from-[#061F30] to-[#061F30] rounded-lg">
            <h1 className="pt-2.5 font-basement font-bold text-xl text-white ">
              Participants (122)
            </h1>
            <div className="mt-5">
              {table.map((user, index) => {
                const opacity =
                  index <= 3 ? 1 : 1 - (index - 3) / (usersRankData.length - 4);
                return (
                  <ParticipationsRankTable
                    key={index}
                    userIndex={user.id}
                    rank={`${index + 1 < 10 ? "0" : ""}${index + 1}`}
                    userName={user.userName}
                    points={user.points}
                    profileImage={user.profileImage}
                    // showwinnericon={index < 3}
                    ranked={user.ranked}
                    currentUserIndex={11}
                    animate={timeRemaining <= 0}
                    style={{
                      opacity: user.id === 11 || index <= 2 ? 1 : opacity,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
