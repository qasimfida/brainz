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

const alphabets = ["A", "B", "C", "D"];
const loading_time = 10 * 1000;
const next_question_time = 8 * 1000;
const skeleton_start_time = 3 * 1000;

export const SelectAnswer = ({
  setSelectedOption,
  questions = [],
  step = 0,
  handleStageChange,
  handleQuestionChange,
  progress,
}) => {
  // console.log("###:", questions.choices);
  // const question = questions[step] || { choices: [] };
  const question = useMemo(
    () => questions[step] || { choices: [] },
    [questions, step]
  );

  const [table, setTable] = useState(usersRankData);
  const [timeRemaining, setTimeRemaining] = useState(-1);
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
        }, 300);
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

        setTimeout(() => {
          if (question.id >= questions.length) {
            handleStageChange();
          } else {
            handleQuestionChange();
          }
        }, loading_time);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, handleQuestionChange, handleStageChange, moveUser]);

  const getOptionVariant = (answer, wrong) => {
    if (timeRemaining > 0) return "default";
    return answer ? "success" : wrong ? "danger" : "default";
  };

  const onAnswerSelect = (answer) => {
    if (!question.answer) {
      setSelectedOption(answer);
    }
  };

  // console.table({ table });

  return (
    <>
      <div className="block mb-8 md:hidden bg-primary-350">
        <div className="px-5 pt-7 pb-3.5">
          <div className="flex items-center justify-between w-full gap-4 mb-5 text-4xl rounded-lg ">
            <h1 className="text-xl font-bold text-white font-basement max-w-36">
              Title of the Session
            </h1>
            <h1 className="text-2xl font-bold text-white font-basement">
              {timeRemaining} s
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
          <div className="flex gap-4 text-white mt-7 md:mt-12 max-w-[830px] text-start">
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
          <div className="pb-5 md:pb-0 flex flex-col mt-6 lg:mt-11 gap-4 max-w-[784px]">
            {question.choices.map((choice, index) => {
              // console.log("choice:", choice);
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
                  answer={timeRemaining === 0 && true}
                  onClick={() => onAnswerSelect(choice)}
                />
              );
            })}
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
              Time remaining
            </p>
            <h1 className="text-3xl font-bold text-white font-basement">
              {timeRemaining} seconds
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
                    showWinnerIcon={index < 3}
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
    </>
  );
};
