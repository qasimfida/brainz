"use client";
import BackModal from "@/app/components/BackModal";
import { CountDown } from "@/app/components/CountDown";
import { ProgressBar } from "@/app/components/Progressbar";
import { SelectAnswer } from "@/app/components/SelectAnswer";
import { SessionHeader } from "@/app/components/SessionHeader";
import { SessionResult } from "@/app/components/SessionResult";
import { apiCall } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const Session = ({ params }) => {
  const [stage, setStage] = useState("countdown");
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [session, setSession] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [question, setQuestion] = useState();
  const router = useRouter();
  const socketRef = useRef(null);
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const getSession = async (id) => {
      const data = await apiCall("get", `/session/${id}`);
      setSession(data.session);
      console.log(data.session.startTime);
      if (new Date(data.session.startTime) < new Date()) {
        alert("session already ended");
        router.push("/dashboard");
      }
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
    setQuestion({ ...question, answer });
    if (socketRef.current) {
      socketRef.current.emit("submitAnswer", { answer });
      console.log("submit");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:3000", {
      reconnectionDelayMax: 10000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socketRef.current = socket;
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
      // console.log({ timeRemaining });
    });
    socket.on("sessionCompleted", () => {
      console.log("Session has ended");
      setStage("sessionResult");
    });

    socket.on("newQuestion", ({ question }) => {
      if (stage === "countdown") {
        setStage("selectAnswer");
      }
      setStep((prev) => prev + 1);
      setQuestion(question.question);
      console.log(step);
    });

    socket.on("questionTimeRemaining", ({ questionTimeRemaining }) => {
      setQuestionTimeRemaining(questionTimeRemaining);
      // console.log({ questionTimeRemaining });
    });
    socket.on("restTimeRemaining", ({ restTimeRemaining }) => {
      setRestTimeRemaining(restTimeRemaining);
      // console.log({ restTimeRemaining });
    });
    socket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
      // console.log(data);
    });

    return () => {
      if (socket.connected) {
        socket.close();
      }
    };
  }, []);

  const progess = (step / session.totalQuestions) * 100 - 1;
  return (
    <div className="relative">
      {stage === "countdown" && (
        <>
          <SessionHeader />
          <div className="px-6 pt-8 pb-3 lg:pt-10 lg:pb-7 lg:px-7">
            <CountDown session={session} timeRemaining={remainingTime} />
          </div>
        </>
      )}
      {stage === "selectAnswer" && (
        <>
          <div className="hidden md:block">
            <SessionHeader />
          </div>
          <div className="hidden md:block fixed w-full top-[76px] left-0 w-full h-2 z-30 transition ease-in">
            <ProgressBar progress={progess} step={step} />
          </div>
          <div className="mt-0 md:mt-8 lg:mt-10">
            <SelectAnswer
              setSelectedOption={handleAnswerSelect}
              question={question}
              step={step}
              progress={progess}
              questionTimeRemaining={questionTimeRemaining}
              restTimeRemaining={restTimeRemaining}
              leaderboard={leaderboard}
              // handleStageChange={handleStageChange}
            />
          </div>
        </>
      )}
      {stage === "sessionResult" && leaderboard && (
        <>
          <SessionHeader />
          <div className="pt-8 pl-6 pr-6 lg:pt-10 md:pl-14 md:pr-16">
            <SessionResult leaderboard={leaderboard} session={session} />
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
