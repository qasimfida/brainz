import React from "react";

const SessionCard = () => {
  return (
    <div className="bg-primary-100 h-auto rounded-[10px] w-full text-base py-4 px-4 lg:py-5 lg:px-5 shadow-sessionCard md:py-7">
      <p className="font-basement font-normal font-grey-400 text-base text-center md:text-left">
        This game has 3 sessions
      </p>
      <div className="mt-2 lg:mt-6 mx-[38px] md:mx-0">
        {["Crypto", "Sports", "Science"].map((session, index) => (
          <h1
            key={index}
            className="text-base lg:text-base font-basement font-bold tracking-[1.5px] md:px-[22px] rounded-[8px] hover:text-secondary hover:bg-gradient-to-r from-[#DFC80B]/40 to-[#FFED5A]/20 border border-[#4299e1]	hover:border-secondary flex items-center py-2 lg:py-2.5 justify-center md:justify-start "
          >
            {session}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default SessionCard;
