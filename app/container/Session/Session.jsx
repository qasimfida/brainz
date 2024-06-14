"use client";
import { CountDown } from "@/app/components/CountDown";
import { ProgressBar } from "@/app/components/Progressbar";
import { SelectAnswer } from "@/app/components/SelectAnswer";
import { SessionHeader } from "@/app/components/SessionHeader";
import { SessionResult } from "@/app/components/SessionResult";
import React, { useEffect, useState } from "react";
import winnerSound from "@/public/sounds/winner-sound.mp3";
import loserSound from "@/public/sounds/fail-sound.mp3";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/app/components/Modals/ConfirmationModal";
import BackModal from "@/app/components/Modals/BackModal";

export const Session = () => {
  const [stage, setStage] = useState("countdown");
  const [timer, setTimer] = useState(60);
  const [showConfirmationModal, setShowConfirmationModal] = useState(true); // State to manage ConfirmationModal visibility
  const [initialRender, setInitialRender] = useState(true); // To avoid showing modal on initial render
  const router = useRouter(); // Hook for navigation
  const [winnerAudio] = useState(new Audio(winnerSound));
  const [loserAudio] = useState(new Audio(loserSound));
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

  const handleConfirmStart = () => {
    setShowConfirmationModal(false); // Hide the confirmation modal
    setStage("countdown"); // Start the countdown stage
  };

  const handleCancelStart = () => {
    router.push("/dashboard"); // Navigate to the dashboard
  };

  useEffect(() => {
    if (stage === "countdown" || stage === "selectAnswer") {
      const handleBeforeUnload = (event) => {
        // event.preventDefault();
        // event.returnValue = "";
        setShowModal(false);
      };

      const handleBackNavigation = (event) => {
        event.preventDefault();
        setShowModal(true);
      };

      if (!initialRender) {
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener("popstate", handleBackNavigation);
      }

      setInitialRender(false);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handleBackNavigation);
      };
    }
  }, [initialRender, showModal, stage]);

  const handleAnswerSelect = (answer) => {
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

  const handleStageChange = (result) => {
    if (result === "win") {
      winnerAudio.currentTime = 0;
      winnerAudio.play();
    } else if (result === "lose") {
      loserAudio.currentTime = 0;
      loserAudio.play();
    }
    setStage("sessionResult");
  };

  const progress = ((step + 1) / questions.length) * 100 - 1;

  return (
    <div className="relative">
      {stage === "countdown" && !showConfirmationModal && (
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
            <ProgressBar progress={progress} step={step + 1} />
          </div>
          <div className="mt-0 md:mt-8 lg:mt-10">
            <SelectAnswer
              setSelectedOption={handleAnswerSelect}
              handleQuestionChange={handleQuestionChange}
              questions={questions}
              step={step}
              progress={progress}
              // handleStageChange={handleStageChange}
              handleStageChange={(result) => handleStageChange(result)}
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
          onCancel={handleCancelStart}
        />
      )}
      <ConfirmationModal
        showModal={showConfirmationModal}
        onConfirm={handleConfirmStart}
        onCancel={handleCancelStart}
        setConfirmationModal={setShowConfirmationModal}
      />
    </div>
  );
};
