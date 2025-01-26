"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/Context";
import { Button } from "@/components/ui/button";
import PriceDisplay from "./PriceDisplay";
import { useToast } from "@/hooks/use-toast";

export default function HoverSidebar({ isSidebarOpen, onClose }) {
  const { toast } = useToast();
  const { cart = [], removeFromCart, currency } = useCart();
  
  let subtotal = cart?.reduce((total, item) => {
    return Number(total) + Number(item?.price?.toString().replace(/,/g, ""));
  }, 0);  

  const handleProceed = () =>{
    if(!subtotal){
      toast({
        title: "Error",
        description: "You don't have items to proceed",
      })
    }else{
      location.href = "/Checkout"
    }
  }
  // const formatPrice = (price) => {
  //   return Number(price).toLocaleString('en-US');
  // };
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 bg-opacity-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-20" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 h-screen right-0 md:w-2/5 w-full p-4 md:pt-10 pb-0 shadow-lg bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        // onMouseLeave={onClose}
      >
        <div className="absolute top-5 right-5 cursor-pointer" onClick={onClose}>
          <X />
        </div>
        <div className="flex justify-center h-full items-center flex-col gap-5">
          <h1 className="text-2xl md:text-3xl font-bold font-domine py-3 w-full text-center border-b">
            Shopping Bag ({cart?.length})
          </h1>
          {cart?.length > 0 ? (
            <div className="flex-1 w-full overflow-y-auto">
              {cart?.map((watch, index) => (
                <div
                  key={index}
                  className="px-5 mb-10 w-full flex justify-between gap-5 relative"
                >
                  {/* <div className="p-1 text-black bg-gray-50 absolute right-5 -top-7 cursor-pointer rounded-full" onClick={onClose}>
                    <X size={15} />
                  </div> */}
                  <div className="w-2/4 h-[150px] relative">
                    <Image
                      src={watch.imageUrls?.[0] || watch.imageUrl}
                      alt={watch?.title || "Product Image"}
                      className="object-cover rounded-md"
                      layout="fill"
                    />
                  </div>

                  <div className="w-2/5 font-montserratMedium">
                    <h2 className="font-domine md:text-xl text-lg font-bold mb-3">
                      {watch?.title}
                    </h2>
                    <p className="md:text-sm text-xs mb-3 line-clamp-3">
                      {watch?.disc || watch?.description}
                    </p>
                    {/* <h3 className="font-domine text-extrabold text-lg">
                      {watch?.price.toLocaleString("en-US")} <span className="text-gray-500 text-sm">AED</span>
                    </h3> */}
                    <PriceDisplay amount={watch.price} toCurrency={currency} />
                  </div>
                    <div className="p-1 text-black bg-gray-50 absolute right-2 -top-1 cursor-pointer rounded-full" onClick={() => removeFromCart(watch?.id)}>
                    <X size={15} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex-1">Your cart is empty.</p>
          )}

          {/* Sticky Bottom Bar */}
          <div className="p-4 w-full sticky bottom-0 border-t py-5">
                <div className="flex justify-between">
                  <h1 className="text-lg md:text-xl uppercase font-montserratSemiBold">
                    Total
                  </h1>
                  {/* <h1 className="text-lg md:text-xl font-montserratSemiBold">
                    <span className="font-montserratRegular">AED</span> {formatPrice(subtotal)}
                  </h1> */}
                  <PriceDisplay amount={subtotal} toCurrency={currency} />
                </div>
                <p className="my-3">
                  Shipping and taxes calculated at checkout.
                </p>
                {/* <Link
                  href="/Checkout"
                  className="w-full mt-3 font-extrabold"
                > */}
                  <Button onClick={handleProceed} className="bg-black font-montserratSemiBold w-full uppercase text-white hover:bg-white hover:text-black !p-4">
                    View My Shopping Bag
                  </Button>
                {/* </Link> */}
              </div>
        </div>
      </div>
    </>
  );
}
