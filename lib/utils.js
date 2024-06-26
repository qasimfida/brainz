import { getAccessToken } from "@privy-io/react-auth";
import axios from "axios";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import uniswapAbi from "@/lib/uniswapAbi.json";

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

export async function getOtherTokenAmountForExactUSDT(
  exactUSDTAmount,
  slippageTolerance,
  OtherTokenAddress,
  signer
) {
  try {
    if (!process.env.NEXT_PUBLIC_ROUTER_V2_ADDRESS) {
      throw new Error(
        "NEXT_PUBLIC_ROUTER_V2_ADDRESS is not defined in the environment variables"
      );
    }
    const routerContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ROUTER_V2_ADDRESS,
      uniswapAbi,
      signer
    );
    const usdtDecimals = await getTokenDecimals(
      process.env.NEXT_PUBLIC_USDT_ADDRESS,
      signer
    );
    const otherTokenDecimals = await getTokenDecimals(
      OtherTokenAddress,
      signer
    );

    // console.log("usdtDecimals===>", usdtDecimals);
    // console.log("otherTokenDecimals===>", otherTokenDecimals);

    const amountOutExactUSDT = ethers.utils.parseUnits(
      exactUSDTAmount.toString(),
      usdtDecimals
    );
    console.log("amountOutExactUSDT===>", amountOutExactUSDT.toString());

    const amountsIn = await routerContract.getAmountsIn(amountOutExactUSDT, [
      OtherTokenAddress,
      process.env.NEXT_PUBLIC_USDT_ADDRESS,
    ]);

    const amountInOtherToken = amountsIn[0];
    console.log(
      "amountInOtherToken===>",
      ethers.utils.formatUnits(amountInOtherToken, otherTokenDecimals)
    );

    const slippage = 1 + slippageTolerance / 100;
    const amountInMaxWithSlippage = amountInOtherToken
      .mul(ethers.BigNumber.from(Math.floor(slippage * 100)))
      .div(ethers.BigNumber.from(100));
    console.log(
      "amountInMaxWithSlippage===>",
      ethers.utils.formatUnits(amountInMaxWithSlippage, otherTokenDecimals)
    );

    return ethers.utils.formatUnits(
      amountInMaxWithSlippage,
      otherTokenDecimals
    );
  } catch (error) {
    console.error("Error in getOtherTokenAmountForExactUSDT:", error);
  }
}

export async function getTokenDecimals(tokenAddress, signer) {
  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
  const decimals = await tokenContract.decimals();
  return decimals;
}

export const playSound = (sound) => {
  const audio = new Audio(sound);
  audio.currentTime = 0;
  audio.play();
};

export const formatNumber = (number, decimals = 2) => {
  const num = Number(number);
  const absNum = Math.abs(num);
  const sign = Math.sign(num);
  let formattedNumber = "";
  if (absNum >= 1.0e12) {
    formattedNumber = (num / 1.0e12).toFixed(decimals) + "T";
  } else if (absNum >= 1.0e9) {
    formattedNumber = (num / 1.0e9).toFixed(decimals) + "B";
  } else if (absNum >= 1.0e6) {
    formattedNumber = (num / 1.0e6).toFixed(decimals) + "M";
  } else if (absNum >= 1.0e3) {
    formattedNumber = (num / 1.0e3).toFixed(decimals) + "K";
  } else {
    formattedNumber = num.toFixed(decimals);
  }
  return sign < 0 ? `-${formattedNumber}` : formattedNumber;
};

export { uniswapAbi };
