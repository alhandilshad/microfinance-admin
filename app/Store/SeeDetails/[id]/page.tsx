"use client";
import Link from "next/link";
import {
  Phone,
  Castle,
  Headset,
  Notebook,
  Share2,
  Heart,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart, Product } from "@/app/context/Context";
import HoverSidebar from "../../../components/HoverSidebar";
import PriceDisplay from "@/app/components/PriceDisplay";
import { useToast } from "@/hooks/use-toast";

export default function SeeMore() {
  const { toast } = useToast();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    watches,
    jewellery,
    cart,
    addToCart,
    addToWishlist,
    wishlist,
    removeFromWishlist,
    currency,
  } = useCart();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState<Product | undefined>(
    undefined
  );
  const [shareModal, setShareModal] = useState(false);
  // // payment integiration
  // const makePayment = async () =>{
  //   try {
  //   const stripe = await loadStripe("pk_test_51QZoQYG4YE9vsTycPOWeeC92AYLSAa4YDlphJMAEbRi0syPh9L02Mq1GNwFsJhNLNxs2UizSAIvTvsCyPhuDUi4400uqzrSwJp")
  //   if (!stripe) {
  //     console.error("Stripe failed to initialize.");
  //     return;
  //   }
  //   const productsWithQuantities = [selectedWatch].map((item) => ({
  //     ...item,
  //     quantity: quantity,
  //   }));
  //   console.log("🚀 ~ productsWithQuantities ~ productsWithQuantities:", productsWithQuantities)

  //   const body = {
  //     products: productsWithQuantities,
  //   }
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }
  //   const response = await fetch("http://localhost:7100/api/create-checkout-session",{
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   });
  //   const session = await response.json();
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id
  //   });
  //   if(result.error){
  //     console.log(result.error);
  //   }
  // }catch (error) {
  //   console.error("Payment Error:", error);
  // }
  // }

  useEffect(() => {
    if (id) {
      const selected =
        watches.find((watch) => watch.id.toString() === id) ||
        jewellery.find((watch) => watch.id.toString() === id);
      setSelectedWatch(selected);
    }
  }, [id, watches]); // Add id to the dependency array

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = (watch: Product | undefined) => {
    if (!watch) return; // Guard clause for undefined watch

    const isAlreadyInCart = cart.some((item) => item.id === watch.id);
    if (isAlreadyInCart) {
      toast({
        title: "Error",
        description: "This item is already in the cart",
      })
      return;
    }
    addToCart(watch);
    setSidebarOpen(true);
  };
  // const totalPrice = selectedWatch ? (parseFloat(selectedWatch?.price?.replace(/,/g, "")) * quantity).toFixed(2) : "0.00";
  const totalPrice = selectedWatch
    ? (
        parseFloat(selectedWatch.price.toString().replace(/,/g, "")) * quantity
      ).toFixed()
    : "0.00";
  type Watch = {
    id: string;
    title: string;
    price: number | string;
    image?: string;
    description?: string;
  };
  const handleWishlistToggle = (watch: Watch) => {
    const product: Product = {
      id: watch.id,
      name: watch.title,
      title: watch.title,
      quantity: 1,
      disc: watch.description || "",
      image: watch.image || "/path/to/default/image.jpg",
      imageUrl: watch.image || "/path/to/default/image.jpg",
      description: watch.description || "",
      price: typeof watch.price === "string" ? parseFloat(watch.price) : watch.price,
      item: { details: "Placeholder object" },
      createdAt: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: (Date.now() % 1000) * 1000000,
      },
      gender: "",
      imageUrls: [],
      caseMaterial: "",
      shape: ""
    };

    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  const isInWishlist = (watchId: string | undefined) => {
    return wishlist.some((item) => item.id === watchId);
  };
  return (
    <div>
      <Header />

      <div className="container mx-auto font-montserratMedium flex justify-center md:flex-row gap-10 flex-col md:my-16 my-8">
        <div className="md:w-2/5 w-full">
          <div className="h-[500px] relative">
            {/* Handle Image */}
            {/* <div className="relative"> */}
            <Image
              src={selectedWatch?.imageUrls?.[0] || "/dummy-image-square.jpg"}
              alt="product image"
              className="object-cover rounded-md"
              layout="fill"
            />
            {/* </div> */}
            <div className="absolute top-5 right-5">
              <div
                className="cursor-pointer p-3 bg-white text-black mt-3 rounded-full"
                onClick={() => setShareModal(true)}
              >
                <Share2 />
              </div>
              <div
                onClick={() =>
                  selectedWatch && handleWishlistToggle(selectedWatch)
                }
                className="cursor-pointer p-3 bg-white text-black mt-3 rounded-full"
              >
                <Heart
                  fill={isInWishlist(selectedWatch?.id) ? "black" : "none"}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {selectedWatch?.imageUrls
              ?.slice(1)
              .map((imageUrl, index) => (
                <div
                  key={index}
                  className="w-full h-[300px] relative border rounded-md"
                >
                  <Image
                    src={imageUrl}
                    alt='image'
                    layout="fill"
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="md:w-2/6 p-4">
          <h1 className="text-2xl font-domine font-bold">
            {selectedWatch?.title}
          </h1>
          <p className="text-gray-600 mt-2 text-xs">
            {selectedWatch?.description}
          </p>
          {/* Quantity and Price */}
          <div className="flex gap-2 mt-6 justify-between">
            <p className="">Quantity</p>
            <div className="flex gap-2 border text-lg items-center md:w-2/5 w-full justify-around rounded-md">
              <span className="cursor-pointer" onClick={handleDecrement}>
                -
              </span>
              <span className="text-sm">{quantity}</span>
              <span className="cursor-pointer" onClick={handleIncrement}>
                +
              </span>
            </div>
          </div>
          {/* Price */}
          <div className="flex justify-between mt-6 font-montserratSemiBold text-xl">
            <p>Price:</p>
            <h3>
              {/* <span className="font-montserratRegular">AED</span> {totalPrice} */}
              <PriceDisplay amount={totalPrice} toCurrency={currency} />
            </h3>
          </div>
          {/* Cart Buttons */}
          <div className="flex justify-between mt-6 gap-5">
            <Button
              onClick={() => handleAddToCart(selectedWatch)}
              className="w-full rounded-md border bg-black hover:bg-white hover:border border-black hover:text-black text-white font-montserratSemiBold uppercase py-1 md:!py-6 md:!px-6"
            >
              {!selectedWatch?.hidePrice ? ( 'Add To Cart' ) : ( 'Call To Order' )}
            </Button>
            {/* <Button onClick={makePayment} className="w-full rounded-md bg-black hover:bg-white hover:border border-black hover:text-black text-white font-montserratSemiBold uppercase py-1 md:!py-6 md:!px-6">
              Buy It Now
            </Button> */}
          </div>
          {/* Contact Info */}
          <div className="mt-8 font-montserratRegular md:text-sm text-xs">
            <Link className="flex gap-4 mt-1" href="">
              <Phone size={16} /> Order by Phone 1-800-227-8437
            </Link>
            <Link className="flex gap-4 mt-1" href="">
              <Castle size={16} /> Find in Boutique
            </Link>
            <Link className="flex gap-4 mt-1" href="">
              <Headset size={16} />
              Contact an ambassador
            </Link>
            <Link className="flex gap-4 mt-1" href="">
              <Notebook size={16} />
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
      <HoverSidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {shareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
          <div className="bg-white p-10 rounded-md relative shadow-lg font-montserratSemiBold w-full font-montserratSemiBold max-w-lg">
            <button
              className="absolute top-4 right-6"
              onClick={() => setShareModal(false)}
            >
              <X />
            </button>
            <h2 className="text-center text-2xl my-5 border-b border-gray-300 pb-3">
              SHARE
            </h2>
            <div className="flex gap-5 text-white justify-center">
              <Link
                href={`https://wa.me/?text=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/whatsapp.png"
                  width={40}
                  height={40}
                  alt="Whatsapp icon"
                />
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebook.png"
                  width={40}
                  height={40}
                  alt="facebook icon"
                />
              </Link>
              <Link href="">
                <Image
                  src="/insta.png"
                  width={40}
                  height={40}
                  alt="Insta logo"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
