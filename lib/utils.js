import { getAccessToken } from "@privy-io/react-auth";
import axios from "axios";
import { ethers } from "ethers";

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

export const apiCall = async (method, url, data = null, accessToken) => {
  const token = localStorage.getItem("token");
  try {
    const config = {
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data,
      headers: {},
    };

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else if (token) {
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
    return null;
  }
};

export const convertSecondsToHMS = (totalSeconds) => {
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

export const getLocalAccessToken = () => {
  return localStorage.getItem("token");
};

export const authenticate = async () => {
  try {
    const accessToken = await getAccessToken();
    const referralId = localStorage.getItem("referralId");
    const body = {};
    if (referralId) {
      localStorage.removeItem("referralId");
      body.referralId = referralId;
    }
    const data = await apiCall("post", "/authenticate", body, accessToken);
    if (data) {
      const expiresAt = new Date(
        new Date().getTime() +
          process.env.NEXT_PUBLIC_TOKEN_EXPIRY * 60 * 60 * 1000
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", expiresAt);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWalletBalance = async ({
  walletAddress,
  tokenAddress,
  provider,
}) => {
  const erc20ABI = ["function balanceOf(address owner) view returns (uint256)"];
  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);
  const balance = await tokenContract.balanceOf(walletAddress);
  let formattedBalance = ethers.utils.formatUnits(balance, 18);
  // limit 5 decimal places if there are more
  if (formattedBalance.includes(".")) {
    const parts = formattedBalance.split(".");
    if (parts[1].length > 5) {
      formattedBalance = `${parts[0]}.${parts[1].slice(0, 5)}`;
    }
  }

  return formattedBalance;
};
