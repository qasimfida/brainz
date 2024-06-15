import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { useWallets } from "@privy-io/react-auth";
import { bsc } from "viem/chains";

const WalletContext = createContext(null);

const WalletProvider = ({ children }) => {
  const { wallets } = useWallets();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(0);

  useEffect(() => {
    const getProvider = async () => {
      const wallet = wallets[0];
      if (!wallet) return;
      await wallet.switchChain(bsc.id);
      const provider = await wallet.getEthersProvider();
      setProvider(provider);
      const signer = provider.getSigner();
      setSigner(signer);
    };

    if (!provider) {
      getProvider();
    }
  });

  useEffect(() => {
    const erc20ABI = [
      "function balanceOf(address owner) view returns (uint256)",
    ];
    async function fetchBSCUSDBalance(walletAddress, provider) {
      const tokenAddress = "0x55d398326f99059ff775485246999027b3197955";
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        provider
      );
      const balance = await tokenContract.balanceOf(walletAddress);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);
      return formattedBalance;
    }
    if (provider) {
      fetchBSCUSDBalance(wallets[0].address, provider).then((balance) => {
        setUsdtBalance(balance);
      });
    }
  }, [provider]);

  return (
    <WalletContext.Provider value={{ provider, signer, usdtBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

export const useWallet = () => {
  return useContext(WalletContext);
};
