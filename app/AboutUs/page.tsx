'use client';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User2, Star, CircleUserRound , Aperture, Clock, HandHelping, Truck, Home } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="relative w-full h-[60vh] ">
            <Image
              src="/cleopatra.jpg"
              alt="Cleopatra Watches & Jewellery Office"
              className="object-cover brightness-50 w-full h-full"
              fill
            />
          </div>
        <div className="absolute bottom-0 flex justify-center items-center w-full ">
          <h1 className="md:text-5xl text-4xl font-montserratSemiBold text-center text-white mb-12">About Cleopatra Watches & Jewellery</h1>
        </div>
        </section>

<div className="container mx-auto">
        {/* Content Sections */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {/* Left Column */}
            <div className="space-y-8 text-[#1e4846]">
              <p className="leading-relaxed text-justify font-montserratSemiBold">
                Founded in 2013, Cleopatra Watches & Jewellery established the first digital platform for buying 
                and selling luxury watches. Today, the company is one of the leading providers 
                of CPO (Certified Pre-Owned) and vintage watches. In addition to its core 
                business in online retail, Cleopatra Watches & Jewellery now also operates exclusive stationary 
                boutiques / lounges at locations worldwide.
              </p>
              <p className="leading-relaxed text-justify font-montserratSemiBold">
                Cleopatra Watches & Jewellery combines the convenience of a web store with the first-class 
                service of a boutique and supports its customers in all phases of purchasing 
                and owning a luxury watch. Both online and offline, we guarantee a shopping 
                experience at the highest level.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-8 text-[#1e4846]">
              <p className="leading-relaxed text-justify font-montserratSemiBold">
                Thanks to the hybrid business model, we can offer both our own stock and 
                stock from manufacturers, retailers and private suppliers. Cleopatra Watches & Jewellery is 
                responsible for controlling the entire process, which is ensured by a team of 
                around 10 in-house watchmakers. They check each watch in a 17-step 
                authenticity and quality control process and then issue a 24-month Cleopatra Watches & Jewellery 
                guarantee.
              </p>
              <p className="leading-relaxed text-justify font-montserratSemiBold">
                Driven by a vision to make the world of luxury watches more accessible, 
                Cleopatra Watches & Jewellery has helped over 175,000 customers in more than 60 countries buy 
                and sell to date.
              </p>
            </div>
          </div>
        </section>

        <h2 className="text-center text-xl md:text-3xl font-bold mb-6 font-montserratSemiBold">Your advantages at Cleopatra Watches & Jewellery</h2>
        <div className="flex justify-center items-center p-5 md:p-24 bg-[#bfdace]">
      <div className="max-w-6xl p-5 md:p-20 border-2 border-[#1e4846]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 justify-start font-montserratSemiBold text-[#1e4846]">
          {/* Card 1 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg underline mb-4">Guaranteed authenticity</h3>
            <div className="mb-4 flex justify-center">
              <Aperture size={40} />
            </div>
            <p className="font-montserratMedium text-xs md:text-sm">
              Each watch is inspected by certified watchmakers and then backed by our 24-months
              Cleopatra warranty.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg underline mb-4">Wide selection</h3>
            <div className="mb-4 flex justify-center">
              <Clock size={40} />
            </div>
            <p className="font-montserratMedium text-xs md:text-sm">
              More than 7,000 luxury watches from 49 brands immediately available online. With no
              waiting lists.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg underline mb-4">Personal assistance</h3>
            <div className="mb-4 flex justify-center items-center">
              <HandHelping size={40} />
            </div>
            <p  className="font-montserratMedium">We are no marketplace and always your contractual partner.</p>
          </div>

          {/* Card 4 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg underline mb-4">Free shipping</h3>
            <div className="mb-4 flex justify-center items-center">
              <Truck size={40} />
            </div>
            <p  className="font-montserratMedium">
              Free shipping worldwide including 14-day return policy. Money-back guarantee – no
              questions asked.
            </p>
          </div>

          {/* Card 5 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg underline mb-4">Personal collection</h3>
            <div className="mb-4 flex justify-center items-center">
              <Home size={40} />
            </div>
            <p className="font-montserratMedium">
              When preferred, collect your watch from a Cleopatra Lounge of your choice and benefit
              from our non-binding try-on service for all in-stock models.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

        {/* Icons Section */}
        <section className="bg-gray-50 py-16 my-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-rows-1  md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: User2, label: "Account", href: "/MyAccount"},
                { icon: Star, label: "Brands", href: "/Brands"},
                { icon: CircleUserRound , label: "Orders", href: "/MyOrders" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <Link href={item.href} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#2F4858] flex items-center justify-center">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-center mt-2">{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}