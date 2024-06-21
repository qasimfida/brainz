"use client";
import Link from "next/link";
import homeBanner from "../../../public/images/homebanner.png";
import logo from "../../../public/images/Brainz-logo.png";
import iphone from "@/public/images/IPhoneFrame.png";
import robot from "@/public/images/robot.png";
import Image from "next/image";
import WaveAnimation from "@/app/components/Wave";
import Footer from "@/app/components/Footer";
import { Button } from "@/app/components/Button";
import { WinBox } from "@/app/components/WinBox";
import { winBoxData } from "./data";
import { useEffect, useState } from "react";
import { calculateTimeLeft } from "@/lib/utils";

export const Waitlist = () => {
  const targetTime = new Date("2024-06-13T23:59:59");

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${homeBanner.src})`,
          width: "100%",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: " no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col items-center "
      >
        <div className="container flex flex-col items-center justify-center px-6 text-center py-14  ">
          <Link href={"/"} className="relative w-20 h-12 lg:w-28 lg:h-16">
            <Image
              src={logo}
              alt="Logo"
              fill={"layout"}
              objectFit="contain"
              draggable={false}
              priority={true}
            />
          </Link>
          <p className="text-white font-basement -mt-4">
            Play Trivia, Win Crypto.
          </p>
        </div>

        <div className="container lg:max-w-[1065px] px-6 py-8 lg:py-14  flex items-center justify-between text-white max-lg:flex-col max-lg:gap-20">
          <div className="w-full lg:w-[60%] max-lg:text-">
            <h1 className=" font-basement text-2xl md:text-3xl lg:text-4xl font-bold ">
              PLAY LIVE TRIVIA GAMES
            </h1>
            <p className=" mt-5 text-base font-normal lg:text-xl ">
              Compete Against Other Players{" "}
            </p>
            <p className="mt-2 text-base font-semibold lg:text-xl ">
              To Win The Pot!
            </p>
            <ul className="list-disc pl-5 mt-4 text-base lg:text-xl capitalize flex flex-col gap-3">
              <li>
                Use{" "}
                <span className="text-secondary font-semibold">
                  any crypto token
                </span>{" "}
                to enter the game
              </li>
              <li>
                Win the game and
                <span className="text-secondary font-semibold">
                  {" "}
                  collect the pot
                </span>
              </li>
              <li>
                <span className="text-secondary font-semibold">
                  Paid in USDT
                </span>{" "}
                straight into your wallet
              </li>
            </ul>
            <div className="flex gap-10  mt-16 lg:mt-20 flex-col">
              <div>
                <p className=" text-base font-normal max-lg:text-center">
                  First Game Pot Size
                </p>{" "}
                <h1 className="mt-2 font-basement text-xl md:text-2xl font-bold  max-lg:text-center">
                  2,500 USDT
                </h1>
              </div>
              <div className="klaviyo-form-S9y8UP"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-max flex items-center justify-center lg:justify-end ">
            <Image src={iphone} alt="iphone" priority={true} />
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center px-6 text-center py-14 text-white ">
          <h1 className=" font-basement text-xl md:text-2xl lg:text-3xl font-bold ">
            JOIN THE RAFFLE
          </h1>
          <p className=" mt-5 text-xl font-semibold lg:text-2xl font-basement ">
            <span className="text-secondary"> $1,000 USD</span> in Prizes
          </p>
        </div>

        <div className="container flex flex-col items-center justify-center px-6 pt-10  pb-14 text-white">
          <div className="bg-primary-300 rounded-[20px] px-5 lg:px-10  py-10 md:py-20  w-full flex justify-between max-md:flex-col gap-5 lg:gap-10">
            <div>
              <h3 className="text-lg font-semibold lg:text-xl font-basement">
                1. Join the Waitlist
              </h3>
              <p className="text-grey-100 mt-2">
                Post about Brainz on Twitter, Insta or Tiktok
              </p>
            </div>
            <div className=" w-[1px] bg-grey-250"></div>
            <div>
              <h3 className="text-lg font-semibold lg:text-xl font-basement">
                2. Re-share our{"  "}
                <span className="underline text-secondary">Post</span>
              </h3>
              <p className="text-grey-100 mt-2">
                Post about Brainz on Twitter, Insta or Tiktok
              </p>
            </div>
            <div className=" w-[1px] bg-grey-250"></div>
            <div>
              <h3 className="text-lg font-semibold lg:text-xl font-basement">
                3. Create your Own Post
              </h3>
              <p className="text-grey-100 mt-2">
                Post about Brainz on Twitter, Insta or Tiktok
              </p>
            </div>
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center px-6 text-center pt-6 lg:pt-12  ">
          <h1 className="text-3xl font-bold text-white font-basement md:text-4xl">
            THE PRIZES
          </h1>
          <p className="mt-4 text-sm font-normal uppercase lg:tracking-[3.2px]  text-grey-100 max-w-md">
            Winners are announced before our first game on July 2 at 3pm ET/ 9pm
            CET
          </p>

          <div className="relative  grid justify-center gap-8 mt-5 -bottom-14 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  pb-14 w-full">
            <WinBox
              imageSrc={winBoxData[0].imageSrc}
              title={winBoxData[0].title}
              height={"h-full"}
            />

            <WinBox
              imageSrc={winBoxData[1].imageSrc}
              title={winBoxData[1].title}
            />

            <WinBox
              imageSrc={winBoxData[2].imageSrc}
              title={winBoxData[2].title}
              height={"h-full"}
            />

            <WinBox
              imageSrc={winBoxData[3].imageSrc}
              title={winBoxData[3].title}
              height={"h-full"}
            />
          </div>
          <p className="mt-10 text-sm font-normal lg:tracking-[3.2px] text-grey-100 uppercase">
            We reserve the right to close or ban, temporarily or permanently,
            any user's account as we deem fraudulent, or any user who violates
            these terms and conditions.
          </p>
          <div className="w-full h-[1px] bg-secondary mt-10"></div>
        </div>
      </div>

      <div className="w-full overflow-hidden relative pt-14 pb-28">
        <div className="container flex flex-col items-center justify-center px-6   text-white mx-auto lg:max-w-[1065px] z-10 relative">
          <h1 className="text-xl font-bold text-white font-basement md:text-2xl text-center">
            UPCOMING GAME
          </h1>
          <div className="flex items-center w-full mt-10 max-lg:flex-col gap-16">
            <div className="w-full lg:w-1/2 flex max-lg:justify-center">
              <div className="w-full max-w-sm pt-10 pb-16 px-6 rounded-lg border shadow-glow relative bg-primary">
                <div className="z-10 relative">
                  <h1 className="text-lg font-bold text-white font-basement md:text-xl text-center">
                    PLAY TRIVIA, WIN CRYPTO
                  </h1>
                  <p className="font-bold text-white font-basement text-sm mt-2 text-center">
                    July 2, 3pm ET / 9pm CET
                  </p>
                  <div className="mt-12 space-y-2  font-basement text-sm  ">
                    <p className=" text-white px-4 ">Crypto 101</p>
                    <p className=" text-secondary border border-secondary bg-[linear-gradient(91deg,_rgba(223,_200,_11,_0.30)_-0.05%,_#2F2A00_99.66%)] font-bold px-4 py-0.5 rounded-md w-max">
                      The Everything Quiz
                    </p>
                    <p className=" text-white px-4 ">Crypto Tokens</p>
                  </div>
                  <p className=" text-white px-4 mt-10">Prize Reward</p>
                  <h1 className="text-lg font-bold text-white font-basement md:text-xl border border-secondary rounded-full w-max px-4 py-0.5 mt-1">
                    2,500 USDT
                  </h1>
                </div>
                <Image
                  src={robot}
                  alt="robot"
                  priority={true}
                  className=" h-[70%]  object-contain absolute bottom-0 -right-[15%]"
                />
                <Image
                  src={logo}
                  alt="brainz"
                  priority={true}
                  className=" w-10  object-contain absolute bottom-2 right-2"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <h1 className="text-lg  text-white font-basement md:text-xl text-center">
                STARTING IN
              </h1>{" "}
              <div className="mt-6 flex gap-3 items-center">
                <div className="w-16 h-16 rounded-lg  text-[#000000] font-basement font-black text-3xl bg-secondary flex items-center justify-center">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="text-4xl font-basement font-bold">:</span>
                <div className="w-16 h-16 rounded-lg  text-[#000000] font-basement font-black text-3xl bg-secondary flex items-center justify-center">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>{" "}
                <span className="text-4xl font-basement font-bold">:</span>
                <div className="w-16 h-16 rounded-lg  text-[#000000] font-basement font-black text-3xl bg-secondary flex items-center justify-center">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
              <p className=" text-white px-4 mt-10">Prize Rewards</p>
              <h1 className="text-xl font-bold text-white font-basement md:text-2xl mt-1">
                2,500 USDT
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full -z-10 max-h-full overflow-hidden">
          <WaveAnimation height={900} />
        </div>
      </div>
      <div className="m-2 border-t border-grey-250">
        <Footer />
      </div>
    </div>
  );
};
