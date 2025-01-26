import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "../context/Context";
import React, { useRef } from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import PriceDisplay from "./PriceDisplay";
import HoverSidebar from "./HoverSidebar";

export default function CardSlider() {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebaropen, setIsSidebaropen] = useState(false);
  const { addToCart, addToWishlist, cart, watches, wishlist, currency } = useCart();

  const handleAddToCart = (watch) => {
    const isAlreadyInCart = cart.some((item) => item.id === watch?.id);

    if (isAlreadyInCart) {
      setIsSidebaropen(true);
      return;
    }
    addToCart(watch);
    setIsSidebaropen(true);
  };

  const handleWishlistToggle = (watch) => {
    if (wishlist.some((item) => item.id === watch.id)) {
      removeFromWishlist(watch.id);
    } else {
      addToWishlist(watch);
    }
  };

  const handleClick = (watch) => {
    handleAddToCart(watch);
    setIsSidebaropen(true);
  };

  // const isInWishlist = (watchId) => {
  //   return wishlist.some((item) => item.id === watchId);
  // };

  const carouselRef = useRef(null);

  return (
    <div className="relative">
      {isSidebaropen && (<HoverSidebar isSidebarOpen={isSidebaropen} onClose={() => setIsSidebaropen(false)} />)}
      <Carousel
        ref={carouselRef}
        opts={{ align: "start", showArrows: false }}
        className="w-full"
      >
        <CarouselContent>
          {watches.map((product) => (
            <CarouselItem
            key={product.id}
            className="md:basis-3/4 lg:basis-1/3 p-4"
          >
            <Card>
              <CardContent className="flex flex-col relative items-center p-4">
                <div className="group w-full bg-white rounded-md transition ease-in-out relative h-[430px] overflow-hidden">
                  {/* Product Image */}
                  <div className="relative w-full h-64">
                    <Link href={`/Store/SeeDetails/${product.id}`} passHref>
                      <Image
                        src={product.imageUrls[0] || "/dummy-image-square.jpg"}
                        alt={product.title || "Product Image"}
                        fill
                          className="object-cover transition-all duration-400 ease-in-out"
                      />
                    </Link>
                  </div>

                  {/* Wishlist Toggle */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full hover:shadow-md"
                    aria-label={`${
                      wishlist.some((item) => item.id === product.id)
                        ? "Remove from"
                        : "Add to"
                    } Wishlist`}
                  >
                    <Heart
                      fill={
                        wishlist.some((item) => item.id === product.id)
                          ? "black"
                          : "none"
                      }
                      className="text-black"
                    />
                  </button>

                  {/* Product Details */}
                  <div className="p-3 text-center">
                    <Link href={`/Store/SeeDetails/${product.id}`} passHref>
                      <h2 className="font-montserratSemiBold mb-3 line-clamp-1 text-base ">{product.title}</h2>
                      <p className="text-xs line-clamp-2 font-montserratMedium">{product.description}</p>
                    </Link>
                    
                      <PriceDisplay amount={product.price} toCurrency={currency} />
                  </div>

                  {/* Add to Cart */}
                 <div className="p-3 absolute left-0 bottom-0 w-full">
                      <button
                          className="py-2 border w-full p-3 rounded-b-md border-black text-sm font-montserratSemiBold "
                          onClick={() => handleClick(product)}>
                          Add To Card
                        </button>
                      </div>
                    {/* <HoverSidebar isSidebarOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}/> */}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1 top-1/2 transform -translate-y-1/2 p-3 bg-black text-white rounded-full hover:bg-gray-800 shadow-lg transition duration-200">
          &larr;
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-black text-white rounded-full hover:bg-gray-800 shadow-lg transition duration-200">
          &rarr;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
