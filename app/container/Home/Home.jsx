import Link from "next/link";
import homeBanner from "../../../public/images/homebanner.png";
import logo from "../../../public/images/Brainz-logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import { WinBox } from "@/app/components/WinBox";
import { winBoxData } from "./data";
import { SlickCarousel } from "@/app/components/Carousel";
import { TokkenCard } from "@/app/components/TokkenCard";
import ConditionsModal from "@/app/components/ConditionsModal";
import WaveAnimation from "@/app/components/Wave";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { Notification } from "@/app/contexts/notification";

export const Home = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const openModal = () => {
    if (token) {
      router.push("/dashboard");
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => setIsOpen(false);

  const handleAccept = () => {
    setIsAccepted(true);
    closeModal();
    localStorage.setItem("token", "user1234");
    router.push("/dashboard");
  };

  const toggleEffect = () => {
    setIsActive(!isActive);
  };

  const toggleNotification = () => {
    // toggleOpen(false);
  };

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
        onClick={toggleEffect}
      >
        <div className="container flex flex-col items-center justify-center px-6 text-center pt-14 pb-14 ">
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
          <h1 className="mt-6 text-3xl font-bold text-white font-basement md:text-4xl">
            Answer questions and win rewards
          </h1>
          <p className="mt-5 text-base font-normal lg:text-lg font-basement text-grey-100">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="mt-9">
            <Button variant={"outlined"} size="text-2xl" onClick={openModal}>
              {token ? "Dashboard" : "Connect"}
            </Button>
          </div>
          {token ? <Notification open={true} /> : null}
          <ConditionsModal
            isOpen={isOpen}
            closeModal={closeModal}
            onAccept={handleAccept}
            toggleNotification={toggleNotification}
          />
          <div className="relative flex grid justify-center gap-8 mt-5 -bottom-14 xs:grid-cols-1 lg:grid-cols-3 pb-14">
            <div className="lg:pt-[78px]">
              <WinBox
                imageSrc={winBoxData[1].imageSrc}
                title={winBoxData[1].title}
                description={winBoxData[1].description}
                height={"h-full"}
              />
            </div>
            <div>
              <WinBox
                imageSrc={winBoxData[2].imageSrc}
                title={winBoxData[2].title}
                description={winBoxData[2].description}
              />
            </div>
            <div className="lg:pt-[54px]">
              <WinBox
                imageSrc={winBoxData[1].imageSrc}
                title={winBoxData[1].title}
                description={winBoxData[2].description}
                height={"h-full"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto lg:px-0">
        <div className="grid xs:grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 bg-primary-325 w-full rounded-[20px] py-6 px-4 lg:py-10 lg:px-24 justify-center items-center">
          {/* box-1 */}
          <div className="text-center lg:border-r lg:border-grey-450 lg:pr-8 max-w-full flex flex-col items-center">
            <h1 className="text-center text-secondary font-basement font-bold text-2xl md:text-3xl lg:text-4xl">
              400k
            </h1>
            <p className="mt-2 text-base lg:text-lg font-normal text-grey-100 font-basement">
              Loved Trusted users & communities.
            </p>
          </div>
          {/* box-2 */}
          <div className="text-center lg:border-r lg:border-grey-450 lg:px-8 max-w-full flex flex-col items-center">
            <h1 className="text-center text-secondary font-basement font-bold text-2xl md:text-3xl lg:text-4xl">
              500k
            </h1>
            <p className="mt-2 text-base lg:text-lg font-normal text-white font-basement">
              Loved Trusted users & communities.
            </p>
          </div>
          {/* box-3 */}
          <div className="text-center lg:pl-8 max-w-full flex flex-col items-center">
            <h1 className="text-center text-secondary font-basement font-bold text-2xl md:text-3xl lg:text-4xl">
              800k
            </h1>
            <p className="mt-2 text-base lg:text-lg font-normal text-white font-basement">
              Loved Trusted users & communities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[86px] flex justify-center">
        <SlickCarousel slidesToShow={5} autoplay={true}>
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
          <TokkenCard />
        </SlickCarousel>
      </div>

      <div className="mt-[104px] flex flex-col justify-center items-center text-center">
        <p className="font-basement font-normal uppercase text-[14px] text-white">
          industries
        </p>
        <div className="max-w-[820px] px-6 mt-6">
          <h1 className="text-2xl	font-bold leading-10 text-white font-basement md:text-4xl	 ">
            Automated messaging for
            <span className="text-secondary"> any industry.</span>
          </h1>
        </div>
      </div>
      <div className="w-full overflow-hidden mt-[12px] ">
        <WaveAnimation />
      </div>
      <div className="mt-8 border-t border-grey-250">
        <Footer />
      </div>
    </div>
  );
};
