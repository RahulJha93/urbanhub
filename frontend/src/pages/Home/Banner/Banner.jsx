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
    <Carousel className="sm:h-[480px] h-[150px]">
      <CarouselContent>
        <CarouselItem className="sm:object-cover w-full h-[480px]"><img src="src/assets/image/banner1.webp" alt=""  /></CarouselItem>
        <CarouselItem className="object-cover w-full h-[480px]"><img src="src/assets/image/banner2.webp" alt=""  /></CarouselItem>
        <CarouselItem className="object-cover w-full h-[480px]"><img src="src/assets/image/banner5.jpg" alt=""  /></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Banner;
