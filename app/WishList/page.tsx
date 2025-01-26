"use client";
import React from "react";
import { useCart } from "../context/Context";
import Header from "../components/Header";
// import { ShoppingCart, Trash } from "lucide-react";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Page = () => {
  const { wishlist } = useCart();
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <div className="container mx-auto md:pt-12 p-4">
          <h1 className="text-2xl md:text-3xl mb-5 font-bold font-domine flex gap-5 items-end">
            Wishlist{" "}
            <span className="text-base font-medium">
              ({wishlist.length} items)
            </span>
          </h1>
          <Card products={wishlist} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
