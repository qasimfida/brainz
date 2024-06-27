"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { Arbitrum, DAppProvider, MetamaskConnector } from "@usedapp/core";
import { bsc, sepolia } from "viem/chains";
import WalletProvider from "./contexts/WalletContext";

export default function Providers({ children }) {
  const config = {
    networks: [Arbitrum],
    readOnlyUrls: {
      [Arbitrum.chainId]: "https://arb1.arbitrum.io/rpc",
    },

    connectors: {
      injected: new MetamaskConnector(),
    },
    refresh: 10,
    noMetamaskDeactivate: true,
  };

  return (
    <DAppProvider config={config}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
          supportedChains: [bsc],
        }}
      >
        <WalletProvider>{children}</WalletProvider>
      </PrivyProvider>
    </DAppProvider>
  );
}
