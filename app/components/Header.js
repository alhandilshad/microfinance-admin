"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import HoverSidebar from "./HoverSidebar";
import { useCart } from "../context/Context";
import {
  Menu,
  X,
  Heart,
  CircleUser,
  ShoppingBag,
  Search,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CurrencySelector from "./CurrencySelector";

const navLinks = [
  { name: "Home", href: "/" },
  // { name: "Festive season", href: "/" },
  { name: "Buy Watches", href: "/Store" },
  { name: "Brands", href: "/Brands" },
  { name: "Jewellery", href: "/Jewellery" },
  { name: "New Arrivals", href: "/NewArrivals" },
  {
    name: "About Us",
    href: "/AboutUs",
    dropdown: [
      { name: "About Us", href: "/AboutUs" },
      { name: "Executive Committee", href: "/Committee" },
    ],
  },
  { name: "Contact Us", href: "/ContactUs" },
];

function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const { cartLength, wishlistLength, user } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const pageName = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const searchMenu = () => setSearchOpen((prev) => !prev);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearch(decodeURIComponent(query));
    }
  }, [searchParams]);

  useEffect(() => {
    if (search) {
      router.push(`/Search?query=${encodeURIComponent(search)}`);
    }
  }, [search, router]);

  return (
    <header className="sticky border-b top-0 md:z-50 z-10 bg-white py-1 flex justify-between items-center">
      <div className="w-[100%]">
        <div className="flex bg-primary p-1 justify-around items-center md:px-6 px-4">
          <div className="gap-10 items-right md:text-lg text-[10px] font-montserratMedium text-[#1e4846] text-left">
            Enjoy 10% Off to Celebrate Our Website Launch! Apply Promo Code{" "}
            <span className="font-montserratSemiBold uppercase">
              CLEOPATRA10%
            </span>
          </div>
          <div className="flex gap-10 items-right">
            <CurrencySelector />
          </div>
        </div>

        <div className="hidden md:flex font-montserratMedium justify-between items-center w-full container mx-auto p-2">
          <div>
            <Link href="/" className="">
              <Image
                src="/logo.png"
                width={110}
                height={30}
                className="object-contain mx-auto"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center relative bg-white p-2 rounded-lg md:w-2/4">
            <Input
              placeholder="Search in over 7,000 luxury watches"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 text-black bg-[#f4f6f6] border md:text-xxl border-[#c7d1d1] font-sans text-lg placeholder:text-base placeholder:text-[#1e4846] rounded-full p-4"
            />
            <div className="p-2 absolute right-3 rounded-full text-white bg-[#1e4846] cursor-pointer">
              <Search size={21} />
            </div>
          </div>

          <div className="flex gap-10 items-center">
            <Link href="/MyAccount">
              <div className="text-sm text-[#1e4846] flex font-montserratSemiBold flex-col justify-center items-center">
                <CircleUser className="mb-1" />
                {user ? "My Account" : "Login or register"}
              </div>
            </Link>

            <div className="relative text-sm text-[#1e4846] flex font-montserratSemiBold flex-col justify-center items-center">
              <Link href="/WishList">
                <Heart className="mb-1" />
              </Link>
              Wishlist
              {!!wishlistLength && (
                <div className="absolute top-[-0.7rem] right-1 rounded-full text-xs bg-[#1e4846] text-white w-5 h-5 flex items-center justify-center font-montserratSemiBold">
                  {wishlistLength}
                </div>
              )}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="relative  text-sm text-[#1e4846] flex font-montserratSemiBold flex-col justify-center items-center">
                <ShoppingBag className="relative group mb-1" />
                Cart
                {!!cartLength && (
                  <div className="absolute top-[-0.7rem] -right-2 rounded-full text-xs bg-[#1e4846] text-white w-5 h-5 flex items-center justify-center font-montserratSemiBold">
                    {cartLength}
                  </div>
                )}
              </div>
            </div>

            <HoverSidebar
              isSidebarOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        <div className="border-t md:block hidden">
          <div className="container flex justify-center p-5 gap-12 mx-auto">
            {navLinks.map((link, index) => {
              const isActive = pageName === link.href;
              return (
                <div className="relative group" key={index}>
                  <Link
                    className={`cursor-pointer pb-1 font-montserratMedium ${
                      isActive
                        ? "text-[#1e4846] border-b-2 border-[#1e4846]"
                        : "text-[#1e4846] hover:border-[#1e4846] hover:border-b duration-300"
                    }`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="min-w-56 absolute left-0 top-full hidden group-hover:block bg-white shadow-md p-2 rounded-md">
                      {link.dropdown.map((sublink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sublink.href}
                          className="block px-4 py-2 text-[#1e4846] hover:bg-gray-100 font-montserratMedium"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center w-full px-4">
          <div className="flex items-center gap-5">
            <div className="cursor-pointer" onClick={toggleMenu}>
              <Menu />
            </div>
            <Image
              src="/logo.png"
              width={100}
              height={40}
              className="object-contain"
              alt="Logo"
            />
          </div>

          <div className="flex gap-4 items-center">
            <div className="text-[#1e4846] mb-2" onClick={searchMenu}>
              <Search size={24} />
            </div>

            <div className="relative text-sm text-[#1e4846] flex font-montserratSemiBold flex-col justify-center items-center">
              <Link href="/WishList">
                <Heart size={24} className="mb-1" />
              </Link>
              {!!wishlistLength && (
                <div className="absolute top-[-0.4rem] right-3 rounded-full text-[10px] bg-[#1e4846] text-white w-4 h-4 flex items-center justify-center font-montserratSemiBold">
                  {wishlistLength}
                </div>
              )}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="relative  text-sm text-[#1e4846] flex font-montserratSemiBold flex-col justify-center items-center">
                <ShoppingBag size={24} className="relative group mb-1" />
                {!!cartLength && (
                  <div className="absolute top-[-0.7rem] -right-2 rounded-full text-xs bg-[#1e4846] text-white w-5 h-5 flex items-center justify-center font-montserratSemiBold">
                    {cartLength}
                  </div>
                )}
              </div>
            </div>
            <HoverSidebar
              isSidebarOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white p-5 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="font-montserratSemiBold text-lg border-b text-[#1e4846] border-black w-full text-center p-3">
            Menu
          </h1>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleMenu}
          >
            <X />
          </div>

          <button className="text-[#1e4846] text-sm font-montserratSemiBold border rounded-full p-1 border-black pt-4 px-5">
            <Link className="flex gap-5" href={"/MyAccount"}>
              {user ? "My Account" : "Login or register"}
              <CircleUser size={30} className="mb-1" />
            </Link>
          </button>

          <div className="flex justify-start w-full flex-col gap-5 mt-5 font-montserratSemiBold">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                <div
                  className="mt-3 text-xl text-[#1e4846] cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    link.dropdown ? handleDropdownToggle(index) : null
                  }
                >
                  <Link href={link.href}>{link.name}</Link>
                  {link.dropdown && (
                    <span>
                      {openDropdown === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </span>
                  )}
                </div>

                {openDropdown === index && link.dropdown && (
                  <div className="pl-5 mt-2 flex flex-col gap-2">
                    {link.dropdown.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subLink.href}
                        className="text-lg text-[#1e4846]"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[15vh] justify-end bg-white p-2 flex flex-col items-center gap-5 transform transition-transform duration-300 z-10  ${
            searchOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center relative bg-white p-2 rounded-lg md:w-2/4 w-full">
            <div className="cursor-pointer mr-2" onClick={searchMenu}>
              <ArrowLeft size={34} color="#1e4846" />
            </div>
            <Input
              placeholder="Search in over 7,000 luxury watches"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 text-black bg-[#f4f6f6] border md:text-xxl border-[#c7d1d1] font-sans text-lg placeholder:text-base placeholder:text-[#1e4846] rounded-full p-4"
            />
            <div className="p-2 absolute right-3 rounded-full text-white bg-[#1e4846] cursor-pointer">
              <Search size={21} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function SuspendedHeader() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
  );
}
