"use client";
import React, { useEffect } from "react";
import { usePrivy, useLogin, getAccessToken } from "@privy-io/react-auth";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const ConnectButton = () => {
  const { ready, authenticated } = usePrivy();
  const searchParams = useSearchParams();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  const { login } = useLogin({
    onComplete: async () => {
      try {
        const accessToken = await getAccessToken();
        const referralId = localStorage.getItem("referralId");
        const data = {};
        if (referralId) {
          localStorage.removeItem("referralId");
          data.referralId = referralId;
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/authenticate`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  useEffect(() => {
    // check if local storage has referralId and delete it
    // check if searchParams has referralId and store it in local storage
    const existingRefrralId = localStorage.getItem("referralId");
    if (existingRefrralId) {
      localStorage.removeItem("referralId");
    }
    const referralId = searchParams.get("referralId");
    if (referralId) {
      localStorage.setItem("referralId", referralId);
    }
  }, []);

  return authenticated ? (
    <>
      <Link href={"/dashboard"}>
        <Button variant={"outlined"} size="text-2xl">
          Dashboard
        </Button>
      </Link>
      {/* <Notification open={true} /> */}
    </>
  ) : (
    <Button
      variant={"outlined"}
      size="text-2xl"
      disabled={disableLogin}
      onClick={login}
    >
      Connect
    </Button>
  );
};

export default ConnectButton;
