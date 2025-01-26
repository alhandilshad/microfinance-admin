"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "../context/Context";
import Image from "next/image";
import HoverSidebar from "./HoverSidebar";
import { useState } from "react";
import PriceDisplay from '../components/PriceDisplay';

export default function Card({ products }) {
  const { addToCart, addToWishlist, wishlist, cart, removeFromWishlist, currency } = useCart()
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebaropen, setIsSidebaropen] = useState(false);

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
    setSidebarOpen(true);
  };
  
  // const isInWishlist = (watchId) => {
  //   return wishlist.some((item) => item.id === watchId);
  // }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3  justify-between">
      {products.map((watch) => (
        <div
          key={watch?.id}
          className="group w-full bg-white mt-5 rounded-md transition ease-in-out relative md:h-[435px] h-[320px] overflow-hidden"
        >
          {/* {watch?.imageUrl && <Image src={watch?.imageUrl || "/dummy-image-square.jpg"} alt={watch?.title} className="w-full h-auto object-cover rounded-md" width={100} height={100} />} */}
          {/* <Image src={watch.imageUrl || "/dummy-image-square.jpg"}  alt={watch?.title}  width={100} height={100} /> */}
          <div className="w-full md:h-64 h-40 relative">
            <Link href={`/Store/SeeDetails/${watch?.id}`} passHref>
              <Image
                src={
                  watch?.imageUrls?.length > 0 ? watch?.imageUrls?.[0] : '/dummy-image-square.jpg'
                }
                alt={watch?.title || "Product Image"}
                fill
                className="object-cover transition-all duration-400 ease-in-out"
              />
            </Link>
          </div>
          <div
            onClick={() => handleWishlistToggle(watch)}
            className={`absolute text-[#1e4846] rounded-full bg-white top-3 right-3 p-1 md:p-3 content-center hover:cursor-pointer}`}
          >
            <Heart
            size={18}
              fill={
                wishlist.some((item) => item.id === watch.id) ? "black" : "none"
              }
            />
          </div>

          <div className="md:p-3 py-2 p-1 text-center">
            <Link href={`/Store/SeeDetails/${watch?.id}`} passHref>
              <h2 className="font-montserratSemiBold mb-3 line-clamp-1 text-sm md:text-base ">
                {watch?.title}
              </h2>
              <p className="text-xs line-clamp-2 font-montserratMedium mb-4">
                {watch?.description}
              </p>
            </Link>

              {/* {new Intl.NumberFormat("en-US").format(watch.price)}
              <span className="text-sm font-montserratRegular"> AED</span> */}
              <PriceDisplay amount={watch.price} toCurrency={currency} />

            <div className="p-3 absolute left-0 bottom-0 w-full">
            <button
                className="py-2 md:text-sm border w-full p-3 rounded-b-md border-black text-sm font-montserratSemiBold "
                onClick={() => {
                  if (!watch.hidePrice) {
                    handleClick(watch);
                  } else {
                    window.location.href = `tel:+971502553602`;
                  }
                }}>
                {!watch.hidePrice ? ( 'Add To Cart' ) : ( 'Call To Order' )}
              </button>
            </div>
            <HoverSidebar isSidebarOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}/>

            {/* <Link
                href={`/Store/SeeDetails/${watch?.id}`}
                passHref
                className="w-full"
              >
                <button className="group-hover:bg-black group-hover:text-gray-100 transform transition-all duration-200 rounded-md w-full ease-out font-bold text-sm font-montserratMedium hover:bg-gray-200 bg-gray-100 py-1 md:py-1.5 md:px-3 px-1">
                  See Details
                </button>
              </Link> */}
          </div>
        </div>
      ))}
      {isSidebaropen && <HoverSidebar 
        isSidebarOpen={isSidebaropen}
        onClose={() => setIsSidebaropen(false)}
       />}
    </div>
  );
}
