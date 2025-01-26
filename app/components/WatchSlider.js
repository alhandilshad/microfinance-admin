"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
const slides = [
    {image: "/mainSlide.jpg",title: "Patek Philippe"},
    {image: "/sliderImage.webp", title: "Rolex",},
    {image: "/ALL-WATCHES.avif",title: "Gold Watches",},
  ];

export default function WatchSlider (){
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  
return(
    <div className="container mx-auto md:p-0 p-4 md:my-20 my-8">
      <h1 className="text-2xl md:text-3xl font-bold font-domine text-center">Our Luxurious Watches</h1>
        <div className="flex md:flex-row flex-col md:mt-10 mt-5 justify-center items-stretch h-[650px]">
                {/* First watch card */}
                <div className="relative md:w-1/4 h-full md:block hidden">
                    <Image src="/imageSlider1.webp" objectFit="cover" fill className="rounded-l-md object-cover" alt="image slider"  priority/>
                    <Link href="/Store">
                      <Button className="absolute bottom-5 left-0 right-0 max-w-max m-auto font-montserratSemiBold">Shop Now</Button>
                    </Link>
                </div>

                {/* secound slider */}
                <div className="relative md:w-2/4 h-full">
                <Carousel className="w-full h-full">
                    <CarouselContent style={{transform: `translateX(-${activeIndex * 100}%)`,transition: "transform 0.5s ease-in-out", height: "100%",}} className="h-full">
                      {slides.map((slide, index) => (
                        <CarouselItem key={index} className="flex justify-center items-center h-[650px]">
                          <div className="relative w-full h-full">
                            <div className="absolute bottom-10  px-6 z-50">
                              <h1 className="text-3xl font-bold font-domine">{slide.title}</h1>
                              <Link href="/Store">
                                <Button className="left-0 right-0 max-w-max m-auto font-montserratSemiBold bg-transparent shadow-none border-b border-black p-0 hover:bg-transparent rounded-none">Shop Now</Button>
                              </Link>
                            </div>
                            <Image src={slide.image} objectFit="cover" fill className="object-cover" alt="image slider"  priority/>
                          </div>
                        </CarouselItem>))}
                    </CarouselContent>
                  </Carousel>
                </div>

                  {/* third watch card */}
                  <div className="relative md:w-1/4 h-full md:grid grid-rows-2 hidden">
                    <div className="relative h-full">
                        <Image src="/mainSlide2.webp" objectFit="cover" fill  className="object-cover rounded-tr-md" alt="image slider"  priority/>
                        <Link href="/Store">
                        <Button className="absolute bottom-5 left-0 right-0 max-w-max m-auto font-montserratSemiBold">Shop Now</Button>
                        </Link>
                    </div>

                    <div className="relative h-full">
                        <Image src="/imageSlider3.jpg" objectFit="cover"fill className="object-cover rounded-br-md" alt="image slider"  priority/>
                        <Link href="/Store">
                          <Button className="absolute bottom-5 left-0 right-0 max-w-max m-auto font-montserratSemiBold">Shop Now</Button>
                        </Link>
                    </div>
                </div>
        </div>
    </div>
);
}