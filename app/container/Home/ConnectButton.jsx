"use client";
import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import { Notification } from "@/app/contexts/notification";

const ConnectButton = () => {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
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
