"use client";
import { Instagram, FacebookIcon, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter email address",
      });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    try {
      await addDoc(collection(db, "Newsletter"), {
        email,
        timestamp: Date.now(),
      });

      setEmail("");
      toast({
        title: "Success",
        description: "Subscribed successfully",
      });
    } catch (error) {
      console.error("Error adding document:", error);
      toast({
        title: "Error",
        description: "Failed to submit the message. Please try again",
      });
    }
  };

  return (
    <footer className="font-montserratMedium bg-[#2c5150] text-primary">
      <div className="container mx-auto ">
        <div className="flex flex-col md:gap-20 gap-10 md:flex-row justify-between md:py-12 p-4">
          <div className="md:w-1/4">
            <Image
              src="/whiteLogo.png"
              width={200}
              height={200}
              className="md:mb-5 mb-3"
              alt="footer logo"
            />
            <p className="underline text-sm mt-3">
              Alkhatib Building Gold Souk - Al Khor St - Deira - Al Sabkha -
              Dubai - United Arab Emirates
            </p>
            <p className="mt-3 font-sm font-montserratRegular">
              <span className="font-extrabold font-domine">Timing:-</span>10:00
              PM to 10:00 PM{" "}
              <span className="font-extrabold font-domine">
                (Monday to Friday)
              </span>
            </p>
          </div>

          <div className="md:w-1/4">
            <h2 className="md:mb-5 mb-3 text-xl font-domine font-bold ">
              About
            </h2>
            <p className="text-sm">
              At Artistry Spa Wellness, we are dedicated to delivering an
              experience that embodies the care and rejuvenation you deserve.
            </p>
          </div>

          <div className="md:w-1/6">
            <h2 className="md:mb-5 mb-3 text-xl font-domine font-bold">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/Store">Buy Watch</Link>
              </li>
              <li>
                <Link href="/Brands">Brands</Link>
              </li>
              <li>
                <Link href="/Jewellery">Jewellery</Link>
              </li>
              <li>
                <Link href="/NewArrivals">New Arrivals</Link>
              </li>
              <li>
                <Link href="/ContactUs">Contact us</Link>
              </li>
              <li>
                <Link href="/AboutUs">About Us</Link>
              </li>
              <li>
                <Link href="/Committee">Executive Committee</Link>
              </li>
              <li>
                <Link href="/PrivacyPolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/Terms">Terms & Condition</Link>
              </li>
            </ul>
          </div>

          {/* <div className="md:w-2/5">
                <h2 className="md:mb-5 mb-3 text-xl font-domine font-bold ">Contact Info</h2>
                <ul className="flex flex-col md:gap-5 gap-3 text-sm ">
                    <li><Link href='https://www.google.com/maps/place/Cleopatra+Watches+%26+Jewellery/@25.2712783,55.2981924,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f43440ccdeaf7:0xc9fae2b1f048750a!8m2!3d25.2712783!4d55.2981924!16s%2Fg%2F11bw20kyrq!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D' className="flex gap-5"><MapPin size={36}/>Alkhatib Building Gold Souk - Al Khor St - Deira Al Sabkha - Dubai, Dubai, United Arab Emirates 80424</Link></li>
                    <li><Link href='tel:+971502553602' className="flex gap-5"><Phone/>+971502553602</Link></li>
                    <li><Link href='mailto:' className="flex gap-5"><Mail />Cleopatra@gmail.com</Link></li>
                </ul>
            </div> */}

          <div className="md:w-1/5">
            <h2 className="md:mb-5 mb-3 text-xl font-bold ">
              Subscribe Now
            </h2>
            <p className="text-sm">
              Join our community for expert tips, exclusive offers, and the
              latest in wellness.
            </p>
            <div className="flex mt-5">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="p-2 rounded-md text-sm w-full mr-4"
                placeholder="Enter Email"
              />
              <Button onClick={handleSubmit} className="bg-black hover:bg-white hover:text-black">
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#315957] flex justify-around text-primary p-7 text-center">
        Copyright © Cleopatra Watches & Jewellery {new Date().getFullYear()}
        <div className="flex gap-5">
          <div>
            <Link href="https://www.instagram.com/cleopatra.watches/?hl=en">
              <Instagram />
            </Link>
          </div>
          <div>
            <Link href="">
              <Linkedin />
            </Link>
          </div>
          <div>
            <Link href="https://www.facebook.com/p/Cleopatra-Watches-Jewellery-100054610353078/">
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
