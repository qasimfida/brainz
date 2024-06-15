"use client";
import { usePrivy } from "@privy-io/react-auth";

const LoagoutButton = () => {
  const { ready, authenticated, logout } = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);
  return (
    <button
      disabled={disableLogout}
      onClick={logout}
      className="block px-4 py-2 text-sm text-grey-200 hover:text-white"
    >
      Log out
    </button>
  );
};

export default LoagoutButton;
