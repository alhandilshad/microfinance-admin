import React from "react";
import Link from "next/link";

export default function TrustedSeller() {
  return (
    <div className="relative md:h-[60vh] h-[70vh]">
      <div className="relative md:block hidden top-0 left-0 w-full h-full bg-fixed bg-center bg-cover bg-[url('https://luxurysouq.com/wp-content/uploads/2025/01/audemars-piguet-buy-in-dubai.jpg')]"></div>
      <div className="relative block md:hidden top-0 left-0 w-full h-full bg-fixed bg-center bg-cover bg-[url('/bannerbg.jpg')]"></div>
      <div className="absolute h-full inset-0 bg-gradient-to-t opacity-95 md:opacity-60 from-transparent to-black"></div>

      <div className="absolute bottom-10 md:bottom-20 md:text-left text-center md:left-16 p-5 md:p-8 max-w-3xl text-white mx-auto">
        <h1 className="md:text-6xl text-3xl font-extrabold font-domine">TRUSTED SELLER​</h1>
        <div className="flex justify-start md:gap-1 mt-10">
          <div className="md:text-6xl text-6xl md:text-[#1e4846] font-montserratSemiBold -mt-6">
            C
          </div>
          <div>
            <p className="font-montserratMedium md:text-lg text-sm text-left">
              loepatra honored to be recognized as{" "}
              <span className="font-extrabold font-domine">
                {" "}
                trusted partners by Chrono24 since 2014 with over 100z of
                checkouts,
              </span>{" "}
              the renowned platform for luxury timepieces.
            </p>
            <p className="mt-5 font-montserratMedium md:text-lg text-sm text-left">
              As an esteemed Chrono24 trusted partner, we uphold the highest
              standards of authenticity, reliability, and exceptional customer
              service.
            </p>
            <button className="p-4 border mt-5 rounded-lg font-montserratSemiBold float-left md:text-lg text-md">
              <Link href="https://www.chrono24.com/search/index.htm?customerId=33105&dosearch=true"></Link>{" "}
              Our Listing on Chrono24
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
