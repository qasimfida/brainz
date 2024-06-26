import axios from "axios";

export const formatWalletAddress = (address) => {
  if (!address) {
    return "";
  }
  const first = address.slice(0, 5);
  const last = address.slice(address.length - 3, address.length);
  return `${first}...${last}`;
};

export const calculateTimeLeft = (endTime, startTime) => {
  const time = startTime ? startTime : new Date();
  const difference = new Date(endTime) - time;
  let timeLeft = {};

  if (difference > 0) {
    const totalHours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeLeft = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return timeLeft;
};

export const apiCall = async (method, url, data = null) => {
  const token = localStorage.getItem("token");
  try {
    const config = {
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data,
      headers: {},
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      alert(error.response.data.message || error.response.statusText);
    } else if (error.request) {
      // Request was made but no response received
      alert("No response received from server");
    } else {
      // Other errors
      alert("Error: " + error.message);
    }
    throw error; // Re-throw the error for further handling if needed
  }
};

export const convertMillisecondsToHMS = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export const getSessionEndTime = (session) => {
  const startTime = session.startTime;
  const startTimeInMs = new Date(startTime).getTime();
  const questionInterval = session.questionInterval * 1000; // in ms
  const questionDuration = session.questionDuration * 1000; // in ms
  const totalQuestionTime = questionDuration + questionInterval; // total time per question block (answer time + rest time)
  const sessionTotalTime =
    totalQuestionTime * (session.totalQuestions - 1) + questionDuration; // total session time

  const endTime = new Date(startTimeInMs + sessionTotalTime);

  return endTime;
};
