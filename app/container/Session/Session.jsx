"use client";
import BackModal from "@/app/components/BackModal";
import { CountDown } from "@/app/components/CountDown";
import { ProgressBar } from "@/app/components/Progressbar";
import { SelectAnswer } from "@/app/components/SelectAnswer";
import { SessionHeader } from "@/app/components/SessionHeader";
import { SessionResult } from "@/app/components/SessionResult";
import { apiCall } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const Session = ({ params }) => {
  const [stage, setStage] = useState("countdown");
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [session, setSession] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const getSession = async (id) => {
      const data = await apiCall("get", `/session/${id}`);
      setSession(data.session);
    };

    getSession(params.id);
  }, []);

  const handleContinue = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (stage === "countdown" || stage === "selectAnswer") {
  //     const handleBeforeUnload = (event) => {
  //       event.preventDefault();
  //       event.returnValue = "";
  //       setShowModal(true);
  //     };

  //     const handleBackNavigation = (event) => {
  //       event.preventDefault();
  //       setShowModal(true);
  //     };

  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //     window.history.pushState(null, null, window.location.pathname);
  //     window.addEventListener("popstate", handleBackNavigation);

  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //       window.removeEventListener("popstate", handleBackNavigation);
  //     };
  //   }
  // }, [showModal, stage]);

  const handleAnswerSelect = (answer) => {
    alert(step);
  };

  const handleQuestionChange = () => {
    setStep(step + 1);
  };
  const handleStageChange = () => {
    setStage("sessionResult");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:3000", {
      reconnectionDelayMax: 10000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("error", ({ message }) => {
      alert(message);
    });
    socket.emit("joinSession", { sessionId: params.id });

    socket.on("sessionNotStarted", ({ timeRemaining }) => {
      setRemainingTime(timeRemaining);
    });

    socket.on("newQuestion", ({ question }) => {
      console.log(question);
    });

    return () => {
      if (socket.connected) {
        socket.close();
      }
    };
  }, []);

  const progess = ((step + 1) / session.totalQuestions) * 100 - 1;
  return (
    <div className="relative">
      {stage === "countdown" && (
        <>
          <SessionHeader />
          <div className="px-6 pt-8 pb-3 lg:pt-10 lg:pb-7 lg:px-7">
            <CountDown
              onComplete={() => console.log("selectAnswer")}
              session={session}
              timeRemaining={remainingTime}
            />
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
              // handleStageChange={handleStageChange}
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
