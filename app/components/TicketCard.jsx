import React from "react";
import { Button } from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  BtcIcon,
  DiamondIcon,
  EthIcon,
  ModalCrossIcon,
  TicketIcon,
  UsdtIcon,
} from "./Svgs";
import PurchaseDropdown from "./PurchaseDropdown";
import { useWallet } from "../contexts/WalletContext";
import { ethers } from "ethers";
import TokenSelectDropdown from "./TokenSelectDropdown";
import {
  apiCall,
  getOtherTokenAmountForExactUSDT,
  getTokenDecimals,
  uniswapAbi,
} from "@/lib/utils";
import { erc20Abi } from "viem";

export const TicketCard = ({ ticketAmount, diamondAmount, price, id }) => {
  const { walletBalances,walletAddress, provider, signer, tokens, platformAddress } =
    useWallet();
  const [isPurchased, setIsPurchased] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("USDT");
  const [priceInOtherToken, setPriceInOtherToken] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const handlePurchase = async () => {
    await sendTransaction();
  };

  const handleTokenChange = async (value) => {
    setSelectedOption(value.symbol);
    if (value.symbol === "USDT") {
      setPriceInOtherToken(0);
      return;
    }
    const tokenAddress = tokens.find(
      (token) => token.symbol === value.symbol
    )?.contractAddress;
    let priceInOtherToken = await getOtherTokenAmountForExactUSDT(
      price,
      1,
      tokenAddress,
      signer
    );
    // limit 5 decimal places if there are more
    if (priceInOtherToken.includes(".")) {
      const parts = priceInOtherToken.split(".");
      if (parts[1].length > 5) {
        priceInOtherToken = `${parts[0]}.${parts[1].slice(0, 5)}`;
      }
    }
    setPriceInOtherToken(priceInOtherToken);
  };

  const sendTransaction = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    if (selectedOption === "USDT") {
      await depositToken(price);
    } else {
      await convertOtherTokenToUSDTAndTransferToPlatformAddress(price, 1);
    }
  };

  async function depositToken(amount) {
    try {
      if (!process.env.NEXT_PUBLIC_USDT_ADDRESS) {
        throw new Error(
          "USDT_ADDRESS is not defined in the environment variables"
        );
      }
      const usdtTokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_USDT_ADDRESS,
        erc20Abi,
        signer
      );
      const decimals = await usdtTokenContract.decimals();

      const depositTx = await usdtTokenContract.transfer(
        platformAddress,
        ethers.utils.parseUnits(amount.toString(), Number(decimals))
      );

      console.log("Deposit transaction hash: ", depositTx.hash);

      const depositResultData = {
        packID: id,
        senderWalletAddress: walletAddress, // user's wallet address
        targetWalletAddress: platformAddress,
        txnHash: depositTx.hash,
        swapToken: process.env.NEXT_PUBLIC_USDT_ADDRESS,
        amountIn: amount.toString(),
        amountOut: amount.toString(),
      };
      // // POST API CREATE TRANSACTION (/transaction) WITH ABOVE DATA
      const data = await apiCall("post", "/transaction", depositResultData);

      const depositReceipt = await depositTx.wait();

      // Check if the transaction was successful
      if (depositReceipt.status === 1) {
        console.log("Deposit successful");
      } else {
        console.log("Deposit transaction failed");
        return;
      }
    } catch (err) {
      console.log("Deposit Error", err);
    }
  }

  async function convertOtherTokenToUSDTAndTransferToPlatformAddress(
    USDTRequired,
    slippageTolerance
  ) {
    console.log("USDTRequired===>", USDTRequired);

    const tokenAddress = tokens.find(
      (token) => token.symbol === selectedOption
    )?.contractAddress;

    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

    // Get decimals for USDT and OtherToken
    const usdtDecimals = await getTokenDecimals(
      process.env.NEXT_PUBLIC_USDT_ADDRESS,
      signer
    );
    const otherTokenDecimals = await getTokenDecimals(tokenAddress, signer);
    console.log("usdtDecimals===>", usdtDecimals);
    console.log("otherTokenDecimals===>", otherTokenDecimals);

    // Calculate the exact amount of USDT required
    const amountOutExactUSDT = ethers.utils.parseUnits(
      USDTRequired.toString(),
      usdtDecimals
    );
    console.log(
      "amountOutExactUSDT===>",
      ethers.utils.formatUnits(amountOutExactUSDT, usdtDecimals)
    );

    const routerContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ROUTER_V2_ADDRESS,
      uniswapAbi,
      signer
    );

    // Get the amount of OtherToken needed for the exact amount of USDT required
    const amountsIn = await routerContract.getAmountsIn(amountOutExactUSDT, [
      tokenAddress,
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

    const otherTokenAllowance = await checkAllowance(tokenAddress);
    console.log(
      "otherTokenAllowance===>",
      ethers.utils.formatUnits(otherTokenAllowance, otherTokenDecimals)
    );

    if (otherTokenAllowance.lt(amountInMaxWithSlippage)) {
      console.log("ALLOWANCE LOW, TRANSACTION TO APPROVE TOKEN SPEND");
      try {
        const approveTx = await tokenContract.approve(
          process.env.NEXT_PUBLIC_ROUTER_V2_ADDRESS,
          amountInOtherToken
        );

        const approveReceipt = await approveTx.wait();

        // Check if the transaction was successful
        if (approveReceipt.status === 1) {
          const newOtherTokenAllowance = await checkAllowance(tokenAddress);
          console.log(
            "newOtherTokenAllowance===>",
            ethers.utils.formatUnits(newOtherTokenAllowance, otherTokenDecimals)
          );
        } else {
          console.log("Approve transaction failed");
          return;
        }
      } catch (err) {
        console.log("Approve Failed", err);
        return;
      }
    } else {
      console.log("ALLOWANCE MATCHED, CONTINUE");
    }

    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

      console.log("SWAP TRANSACTION");

      const swapTx = await routerContract.swapTokensForExactTokens(
        amountOutExactUSDT,
        amountInMaxWithSlippage,
        [tokenAddress, process.env.NEXT_PUBLIC_USDT_ADDRESS],
        platformAddress,
        deadline,
        {
          gasLimit: 1000000,
        }
      );

      const swapResultData = {
        packID: id,
        senderWalletAddress: walletAddress, // user's wallet address
        targetWalletAddress: platformAddress,
        txnHash: swapTx.hash,
        swapToken: tokenAddress,
        amountIn: ethers.utils.formatUnits(
          amountInOtherToken,
          otherTokenDecimals
        ),
        amountOut: ethers.utils.formatUnits(amountOutExactUSDT, usdtDecimals),
      };

      const data = await apiCall("post", "/transaction", swapResultData);

      const swapReceipt = await swapTx.wait();

      // Check if the transaction was successful
      if (swapReceipt.status === 1) {
        console.log("Swap successful");
      } else {
        console.log("Swap transaction failed");
        return;
      }
    } catch (err) {
      console.log("Swap Error", err);
    }
  }

  return (
    <div className="bg-primary-350 rounded-[20px] border border-primary-275 py-5 px-[18px] text-center w-full">
      <div className="flex items-center justify-center gap-5">
        {ticketAmount > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            <h1 className="text-xl lg:text-3xl font-basement font-bold">
              {ticketAmount}
            </h1>
            <TicketIcon className={"text-danger-100"} />
          </div>
        )}
        {diamondAmount > 0 && (
          <div className="flex items-center justify-center gap-[10px]">
            <h1 className="text-xl lg:text-3xl font-basement font-bold">
              {diamondAmount}
            </h1>
            <DiamondIcon className={"text-success"} />
          </div>
        )}
      </div>
      <p className="my-2 font-basement font-normal text-grey-400 text-sm">
        For
      </p>
      <h2 className="font-basement font-bold text-base lg:text-lg mt-2.5">
        {price} USDT
      </h2>
      <div className="mt-[8px]">
        <Button
          variant={"outlined"}
          size="text-sm lg:text-base"
          className={"sm:px-5 py-1 md:px-6 lg:px-10"}
          onClick={openModal}
        >
          Buy now
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[724px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-275 py-6 px-6 md:px-12  align-middle shadow-xl transition-all">
                  {isPurchased ? (
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-basement font-bold">
                        Buy
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-lg  md:text-2xl font-basement font-bold mt-6 md:mt-10 max-w-[458px]">
                          You purchased
                          {ticketAmount > 0 && (
                            <span>
                              {ticketAmount}{" "}
                              <TicketIcon className={"text-danger-100"} />
                            </span>
                          )}
                          {diamondAmount > 0 && (
                            <span>
                              {diamondAmount}{" "}
                              <DiamondIcon className={"text-success"} />
                            </span>
                          )}
                          for {price} USDT.
                        </h2>
                      </div>
                      <div className="flex justify-center mt-[140px] pb-8">
                        <p className="text-base md:text-lg font-basement font-normal max-w-[458px] ">
                          Your purchase was successful!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-[26px] md:text-4xl font-basement font-bold">
                        Buy
                      </h1>
                      <div className="flex justify-center">
                        <h2 className="text-lg md:text-2xl font-basement font-bold mt-10 max-w-[458px]">
                          You are purchasing{" "}
                          {ticketAmount > 0 && (
                            <span>{ticketAmount} tickets </span>
                          )}
                          {diamondAmount > 0 && (
                            <span> {diamondAmount} diamonds </span>
                          )}
                          for{" "}
                          {priceInOtherToken > 0 ? priceInOtherToken : price}{" "}
                          {selectedOption}.
                        </h2>
                      </div>
                      <div className="flex justify-center mt-8">
                        <p className="text-sm e md:text-lg font-basement font-normal max-w-[458px] ">
                          Select USDT or Equivalent Token to purchase the
                          bundles
                        </p>
                      </div>
                      <div className="flex flex-col gap-4  max-w-xs mx-auto text-left mt-5">
                        <div className="flex flex-col gap-3 w-full">
                          <TokenSelectDropdown
                            options={walletBalances}
                            onChange={handleTokenChange}
                            className={"max-h-44 "}
                          />

                          <p className="text-right text-sm">
                            Balance:{" "}
                            {
                              walletBalances.find(
                                (balance) => balance.symbol === selectedOption
                              )?.balance
                            }
                          </p>
                        </div>
                        <div className="flex justify-between gap-3">
                          <h1 className="font-bold font-basement text-xl">
                            You pay
                          </h1>
                          <h1 className="font-bold font-basement text-xl">
                            {priceInOtherToken > 0 ? priceInOtherToken : price}{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="mt-[48px] flex justify-center gap-[34px] ">
                        <Button variant={"outlined"} onClick={handlePurchase}>
                          Purchase
                        </Button>
                        <button
                          className="text-nowrap font-basement font-bold bg-transparent border border-white border-2 text-white font-bold py-2 rounded-full inline-flex items-center duration-200 hover:bg-white hover:text-dark px-[41px] py-[4px]"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={closeModal}
                    className="absolute top-[38px] right-[50px] "
                  >
                    <ModalCrossIcon
                      className={
                        "text-white hover:text-secondary cursor-pointer"
                      }
                    />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
