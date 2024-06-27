"use client";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const Loader = ({ children }) => {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  if (!ready) {
    return (
      <div className="fixed top-0 right-0 flex items-center justify-center w-full h-screen gap-4 text-white bg-primary z-[1000000]">
        <div className="z-50 border-4 rounded-full w-10 h-10 animate-spin border-secondary border-s-secondary/20 " />
        Loading
      </div>
    );
  }

  if (ready && !authenticated) {
    router.push("/");
    localStorage.removeItem("token");
  }

  if (ready && authenticated) {
    const token = localStorage.getItem("token");
    if (!token) {
    }

    return children;
  }
};

export default Loader;
