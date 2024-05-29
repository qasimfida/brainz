import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SlickCarousel = ({
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
    centerMode: true,
    centerPadding: "136px",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: "60px",
        },
      },
    ],
  };

  return (
    <div className=" w-full mx-auto">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
