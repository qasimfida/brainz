import Image from "next/image";
import { useState } from "react";
import { ImageSkeleton } from "./Skeletons/ImageSkeleton";

export const WinBox = ({ imageSrc, title, description, height, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`bg-primary-300 rounded-[20px] px-3 pt-5 pb-9 w-full text-center ${height} shadow`}
      {...rest}
    >
      <div className="relative bg-[#2c8293] rounded-[20px] h-[180px] lg:h-[230px] w-full">
        <Image
          src={imageSrc}
          alt="Reward Box"
          layout="fill"
          objectFit="contain"
          draggable={false}
          priority={true}
          className={`${!loaded ? "opacity-0" : "opacity-100"}`}
          onLoadingComplete={() => setLoaded(true)}
        />
        {!loaded && <ImageSkeleton height={"h-[180px] lg:h-[230px]"} />}
      </div>

      <h1 className="mt-4 lg:mt-8 text-base lg:text-lg font-bold text-white font-basement">
        {title}
      </h1>
      <p className="pt-2 text-base lg:text-lg font-normal text-center font-inter text-grey-100">
        {description}
      </p>
    </div>
  );
};
