import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const GameCarousel = ({
  slidesToShow = 7,
  showArrows = false,
  showDots = false,
  autoplay = false,
  children,
}) => {
  const settings = {
    dots: showDots,
    arrows: showArrows,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 2000,
    // centerPadding: "20px",
    // centerMode: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto ">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
