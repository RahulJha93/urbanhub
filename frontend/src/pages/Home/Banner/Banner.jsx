import React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
const Banner = () => {
   const [current, setCurrent] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
      id: 2,
      title: "Winter Sale Collections",
      description: "Sale! Up to 50% off!",
      img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
      url: "/",
      bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
      id: 3,
      title: "SmartWatch  Collections",
      description: "Sale! Up to 50% off!",
      img: "https://www.boat-lifestyle.com/cdn/shop/files/WaveSigma-FI_Black02_1500x.png?v=1702009260",
      url: "/",
      bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
  ];
  
  return (
    // <Carousel className="">
    //   <CarouselContent className="flex">
    //     {/* For small devices, show one item at a time */}
    //     <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
    //       <img src="src/assets/image/banner1.webp" alt="" />
    //     </CarouselItem>
    //     <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
    //       <img src="src/assets/image/banner2.webp" alt="" />
    //     </CarouselItem>
    //     <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
    //       <img src="src/assets/image/banner5.jpg" alt="" />
    //     </CarouselItem>
    //   </CarouselContent>
    //   <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
    //   <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
    // </Carousel>

    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4 ">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <img
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
