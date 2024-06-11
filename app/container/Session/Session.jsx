"use client";
import BackModal from "@/app/components/BackModal";
import { CountDown } from "@/app/components/CountDown";
import { ProgressBar } from "@/app/components/Progressbar";
import { SelectAnswer } from "@/app/components/SelectAnswer";
import { SessionHeader } from "@/app/components/SessionHeader";
import { SessionResult } from "@/app/components/SessionResult";
import React, { useEffect, useState } from "react";

export const Session = () => {
  const [stage, setStage] = useState("countdown");
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "What is the significance of smart contracts in the Ethereum network, and how do they differ from traditional contracts?",
      choices: [
        "This is the success variant with answer true.",
        "This is the danger variant with answer false.",
        "This is the default variant.",
        "This is a standard variant.",
      ],
      time: 6,
      aplhabet: "A",
      correctAnswer: "This is the default variant.",
    },
    {
      id: 2,
      question:
        "How does Bitcoin differ from traditional fiat currencies, and what advantages does it offer over conventional money systems?",
      choices: [
        "This is the success variant with answer true.",
        "This is the danger variant with answer false.",
        "This is the default variant.",
        "This is a standard variant.",
      ],
      time: 6,
      aplhabet: "B",
      correctAnswer: "This is the default variant.",
    },
    {
      id: 4,
      question:
        "What role do miners play in the cryptocurrency ecosystem, and how are they incentivized to maintain the network?",
      choices: [
        "This is the success variant with answer true.",
        "This is the danger variant with answer false.",
        "This is the default variant.",
        "This is a standard variant.",
      ],
      time: 6,
      aplhabet: "C",
      correctAnswer: "This is the default variant.",
      stop: true,
    },
  ]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (stage === "countdown") {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(interval);
        setStage("optionSelection");
      }

      return () => clearInterval(interval);
    }
  }, [stage, timer]);

  const handleContinue = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (stage === "countdown" || stage === "selectAnswer") {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
        setShowModal(true);
      };

      const handleBackNavigation = (event) => {
        event.preventDefault();
        setShowModal(true);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener("popstate", handleBackNavigation);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handleBackNavigation);
      };
    }
  }, [showModal, stage]);

  const handleAnswerSelect = (answer) => {
    alert(step);
    setQuestions((prev) => {
      const updatedQuestions = prev.map((question, index) => {
        if (index === step) {
          return { ...question, answer: answer };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  const handleQuestionChange = () => {
    setStep(step + 1);
  };
  const handleStageChange = () => {
    setStage("sessionResult");
  };

  const progess = ((step + 1) / questions.length) * 100 - 1;
  return (
    <div className="relative">
      {stage === "countdown" && (
        <>
          <SessionHeader />
          <div className="px-6 pt-8 pb-3 lg:pt-10 lg:pb-7 lg:px-7">
            <CountDown onComplete={() => setStage("selectAnswer")} />
          </div>
        </>
      )}
      {stage === "selectAnswer" && (
        <>
          <div className="hidden md:block">
            <SessionHeader />
          </div>
          <div className="hidden md:block fixed w-full top-[76px] left-0 w-full h-2 z-30 transition ease-in">
            <ProgressBar progress={progess} step={step + 1} />
          </div>
          <div className="mt-0 md:mt-8 lg:mt-10">
            <SelectAnswer
              setSelectedOption={handleAnswerSelect}
              handleQuestionChange={handleQuestionChange}
              questions={questions}
              step={step}
              progress={progess}
              handleStageChange={handleStageChange}
            />
          </div>
        </>
      )}
      {stage === "sessionResult" && (
        <>
          <SessionHeader />
          <div className="pt-8 pl-6 pr-6 lg:pt-10 md:pl-14 md:pr-16">
            <SessionResult />
          </div>
        </>
      )}
      {showModal && (
        <BackModal
          showModal={showModal}
          setShowModal={setShowModal}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};
