"use client";

import React, { useState, useEffect, useRef } from "react";
import SelectDropdown from "./SelectDropdown";
import Logo from "@/public/images/Brainz-logo.png";

import {
  ArrowDownLightIcon,
  DiamondIcon,
  EthIcon,
  MenuIcon,
  NavbarCrossIcon,
  TextCopyIcon,
  TextCopyTickIcon,
  TicketIcon,
} from "./Svgs";
import Ticket from "./Ticket";
import Image from "next/image";
import Profile from "@/public/images/avatar.jpeg";
import Link from "next/link";
import { MobileSidebar } from "./MobileSidebar";

const textToCopy = "0x1234567890ABCDEF1234567890ABCDEF12345678";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const toggleDropdown = () => {
    setIsOpenProfile(!isOpenProfile);
    if (isOpenProfile == false) {
      setIsCopied(false);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (profileRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${profileRef.current.offsetWidth}px`;
    }
  }, [isOpenProfile]);

  const defaultOption = "ETH";
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const options = [
    { icon: <EthIcon height="20" width="20" />, price: 12.0503, label: "ETH" },
    { icon: <EthIcon height="20" width="20" />, price: 44.0503, label: "BTC" },
    { icon: <EthIcon height="20" width="20" />, price: 44.0503, label: "LTC" },
    { icon: <EthIcon height="20" width="20" />, price: 44.0503, label: "XRP" },
  ];

  const copyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(textToCopy);
    console.log("text copyied");
  };

  return (
    <div className="sticky top-0 z-40">
      <nav className="border-secondary bg-primary-350 py-3.5 md:bg-primary">
        <div className="px-4 mx-auto md:px-0">
          <div className="flex items-center justify-end border-white md:mt-0 max-md:justify-between">
            <Link
              href="/"
              className="relative w-12 h-8 lg:w-16 lg:h-12 md:hidden"
            >
              <Image
                src={Logo}
                alt="Logo"
                fill={"layout"}
                objectFit="contain"
                draggable={false}
                priority={true}
              />
            </Link>
            <div className="flex items-center gap-10 max-md:hidden">
              <div className="block max-[1200px]:hidden">
                <SelectDropdown
                  options={options}
                  onChange={handleSelectChange}
                  defaultOption={options[1].label}
                />
              </div>
              <div>
                <Ticket
                  mainIcon={TicketIcon}
                  number={55}
                  label="Tickets"
                  bgColor="danger"
                  href="/dashboard/shop"
                />
              </div>
              <div>
                <Ticket
                  mainIcon={DiamondIcon}
                  number={204}
                  label="Diamonds"
                  bgColor="success"
                  href="/dashboard/shop"
                />
              </div>
              <div
                className="relative rounded-[88px] max-lg:hidden"
                ref={profileRef}
              >
                <div
                  onClick={toggleDropdown}
                  className={`${
                    isOpenProfile ? "bg-primary-275" : "bg-primary-350"
                  } border border-primary-275 transition duration-200 hover:bg-primary-275 flex relative items-center rounded-lg py-2 pl-3 pr-5 cursor-pointer z-50 w-fit`}
                >
                  <div className="relative object-cover w-8 h-8 mr-3 overflow-hidden border rounded-full border-secondary">
                    <Image
                      src={Profile}
                      alt="Profile"
                      layout="fill"
                      className="rounded-full"
                      objectFit="cover"
                      draggable={false}
                      placeholder="blur"
                    />
                  </div>
                  <p className="ml-2 text-sm font-normal text-white font-basement">
                    Blue_guy78
                  </p>
                  <div className="flex items-center justify-center ml-4">
                    <ArrowDownLightIcon />
                  </div>
                </div>
                {isOpenProfile && (
                  <div
                    ref={dropdownRef}
                    className="font-basement absolute right-0 mt-[5px] bg-dark-100 text-grey-200 text-sm shadow-lg rounded-lg z-10 text-center flex justify-center flex-col px-5"
                  >
                    <div className="flex items-center justify-between pt-4 pb-2 text-sm text-grey-200">
                      <p
                        className={`hover:text-white max-w-[120px] text-ellipsis whitespace-nowrap truncate overflow-hidden ${
                          !isCopied ? "" : "text-white"
                        }`}
                      >
                        {textToCopy}
                      </p>
                      {isCopied ? (
                        <TextCopyTickIcon
                          height="22"
                          width="24"
                          className={"text-white"}
                        />
                      ) : (
                        <button onClick={copyToClipboard}>
                          <TextCopyIcon
                            className="hover:text-white text-grey-200"
                            height="22"
                            width="24"
                          />
                        </button>
                      )}
                    </div>
                    <div className="border-b border-grey-250" />
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-grey-200 hover:text-white"
                    >
                      Log out
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <button
                  className="text-white transition-opacity duration-300 hamburger focus:outline-none"
                  onClick={toggleMenu}
                >
                  <div className={`bar-wrapper ${isOpen ? "cross" : ""}`}>
                    <div className="mb-1.5 rounded-sm bar"></div>
                    <div className="relative mb-1.5 rounded-sm bar -right-3"></div>
                    <div className="rounded-sm bar"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 bg-primary md:hidden flex justify-start z-40 top-[60px] broder border-white">
          <div className="h-[calc(100vh-84px)] w-full px-4 mt-6 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-y-scroll">
            <MobileSidebar onNavLinkClick={toggleMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
