"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const WinBox = ({
  imageSrc,
  title,
  description,
  height,
  imageBg = "#2c8293",
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setIsLoading]);
  return (
    <div
      className={`bg-primary-300 rounded-[20px] px-3 pt-5 pb-9 w-full text-center ${height} shadow`}
      {...rest}
    >
      {isLoading ? (
        <Skeleton height={230} borderRadius={"1.5rem"} count={1} />
      ) : (
        <div
          className="relative rounded-[20px] h-[180px] lg:h-[230px] w-full overflow-hidden"
          style={{
            background: imageBg,
          }}
        >
          <Image
            src={imageSrc}
            alt="Reward Box"
            layout="fill"
            objectFit="contain"
            draggable={false}
            priority={true}
          />
        </div>
      )}

      <h1 className="px-4 mt-4 text-base font-bold text-white lg:px-10 lg:mt-8 lg:text-lg font-basement">
        {title}
      </h1>
      <p className="px-2 pt-2 text-base font-normal text-center lg:px-1 lg:text-lg font-inter text-grey-100">
        {description}
      </p>
    </div>
  );
};
