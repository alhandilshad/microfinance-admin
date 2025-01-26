"use client";
import React from "react";
import Header from "../components/Header";
import Image from "next/image";

export default function page() {

  const Brands = [
    {
      brand: "Rolex",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Logo_da_Rolex.png"
    },
    {
      brand: "Omega",
      logo: "https://1000logos.net/wp-content/uploads/2018/10/Omega-logo.png"
    },
    {
      brand: "Patek Philippe",
      logo: "https://cdn.worldvectorlogo.com/logos/patek-philippe-sa-1.svg"
    },
    {
      brand: "Audemars Piguet",
      logo: "https://cdn.freebiesupply.com/logos/large/2x/audemars-piguet-logo-png-transparent.png"
    },
    {
      brand: "TAG Heuer",
      logo: "https://cdn.freebiesupply.com/logos/large/2x/tag-heuer-1-logo-png-transparent.png"
    },
    {
      brand: "Seiko",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Seiko_logo.svg/2560px-Seiko_logo.svg.png"
    },
    {
      brand: "Casio",
      logo: "https://1000logos.net/wp-content/uploads/2017/12/Casio-Logo.png"
    },
    {
      brand: "Fossil",
      logo: "https://1000logos.net/wp-content/uploads/2020/09/Fossil-Logo.jpg"
    },
    {
      brand: "Citizen",
      logo: "https://www.cdnlogo.com/logos/c/83/citizen.svg"
    },
    {
      brand: "Breitling",
      logo: "https://i.pinimg.com/originals/66/df/dd/66dfddb8979887236806cbb174fb086e.jpg"
    }
  ];
  
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 md:my-28 mt-10">
        <div className="flex justify-between border-b pb-5 mb-10">
          <h1 className="text-2xl md:text-3xl font-bold font-domine">
            Watch Brands and Manufacturers
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-5 justify-between">
          {Brands.map((watch, index) => (
            <div
              key={index}
              className="group w-full bg-white rounded-md transition ease-in-out relative md:h-auto  outline outline-gray-200"
            >
              <div className="w-full h-60 relative">
                  <Image
                    src={watch?.logo || "/dummy-image-square.jpg"}
                    alt={watch?.brand || "Product Image"}
                    fill
                    className="object-contain"
                  />
              </div>

              <div className="p-3">
              <h1 className="text-xl font-bold font-domine"> {watch?.brand} </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
