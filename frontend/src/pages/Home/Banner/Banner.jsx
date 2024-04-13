import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Banner = () => {
  return (
    <Carousel className="">
      <CarouselContent className="flex">
        {/* For small devices, show one item at a time */}
        <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
          <img src="src/assets/image/banner1.webp" alt="" />
        </CarouselItem>
        <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
          <img src="src/assets/image/banner2.webp" alt="" />
        </CarouselItem>
        <CarouselItem className="sm:w-full sm:object-cover sm:h-[480px] w-full h-[150px]">
          <img src="src/assets/image/banner5.jpg" alt="" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
};

export default Banner;
