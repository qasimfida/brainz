"use client";
import { apiCall, authenticate } from "@/lib/utils";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

const Loader = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (ready && authenticated) {
        let token = localStorage.getItem("token");
        const expiresAt = localStorage.getItem("expiresAt");
        const expired = new Date(expiresAt) < new Date();

        if (!token || expired) {
          const data = await authenticate();
          if (!data) {
            logout();
            return;
          }
          token = data.token;
        }

        if (!user) {
          if (token) {
            const userData = await apiCall("get", "/profile");
            if (!userData) {
              logout();
              return;
            }
            setUser(userData.profile);
          }
        }
      } else if (ready && !authenticated) {
        router.push("/");
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
      }

      setLoading(false);
    };

    if (ready) {
      checkAuthentication();
    }
  }, [ready, authenticated, router]);

  if (!ready || loading) {
    return (
      <div className="fixed top-0 right-0 flex items-center justify-center w-full h-screen gap-4 text-white bg-primary z-[1000000]">
        <div className="z-50 border-4 rounded-full w-10 h-10 animate-spin border-secondary border-s-secondary/20 " />
        Loading
      </div>
    );
  }

  if (ready && authenticated && !loading) {
    return children;
  }

  return null;
};

export default Loader;
