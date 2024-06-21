"use client";
import React from "react";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import axios from "axios";

const ConnectButton = () => {
  const { ready, authenticated } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  const { login } = useLogin({
    onComplete: async (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      // console.log(
      //   user,
      //   isNewUser,
      //   wasAlreadyAuthenticated,
      //   loginMethod,
      //   linkedAccount
      // );

      if (loginMethod === "google") {
        const data = {
          email: linkedAccount.email,
          privyID: user.id,
          walletAddress: user.wallet.address,
        };
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/authenticate`,
          data
        );

        localStorage.setItem("token", res.data.token);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

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
