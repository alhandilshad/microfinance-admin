"use client";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { auth, db } from "../../firebase";
import Header from "../components/Header";
import { Product, useCart } from "../context/Context";
import AuthModal from "../components/AuthModal";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, MoveRight } from "lucide-react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import BillingDetails from "../components/BillingDetails";
import PriceDisplay from "../components/PriceDisplay";
import { useToast } from "@/hooks/use-toast";

function Page() {
  const { toast } = useToast();
  const { cart, removeFromCart, coupons, addToWishlist, options, currency } =
    useCart();
  console.log("🚀 ~ cart:", cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [confirmOrderModal, setConfirmOrderModal] = useState(false);
  // const [isExpend, setIsExpend] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [coupon, setCoupon] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [displayedSubTotal, setDisplayedSubTotal] = useState(0);
  const [checkoutOptions, setCheckoutOptions] = useState({});
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [couponApply, setCouponApply] = useState(false);
  // const [paymentType, setPaymentType] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    // address: "",
    streetAddress: "",
    state: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  useEffect(() => {
    const total = cart.reduce((total, item) => {
      const price = Number(item?.price?.toString().replace(/,/g, "") || 0);
      const quantity = Number(quantities[item?.id] || 1);
      return total + price * quantity;
    }, 0);

    setDisplayedSubTotal(total);
  }, [cart, quantities, checkoutOptions]);

  // const total = cart.reduce((total, item) => {
  //   const price = Number(item?.price?.toString().replace(/,/g, "") || 0);
  //   const quantity = Number(quantities[item?.id] || 1);
  //   return total + price * quantity;
  // }, 0);

  // const handleToggleExpand = (id: string) => {
  //   setIsExpend((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  // const handleUser = () =>{
  //   if(auth.currentUser){
  //     setConfirmOrderModal(true)
  //   }else{
  //     setIsModalOpen(true);
  //   }
  // }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, dataset } = e.target;
    const price = parseFloat(dataset.price || "0");

    setCheckoutOptions((prev) => ({
      ...prev,
      [name]: checked ? price : 0,
    }));
  };

  // payment integiration
  // const handlePaymentType = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaymentType(e.target.value);
  // };

  const makePayment = async () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      // "address",
      "country",
      "email",
      "phone",
      "city",
      "streetAddress",
    ];

    requiredFields.forEach((field) => {
      if (!(formData as Record<string, string>)[field]?.trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    // if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
    //   toast({
    //     title: "Error",
    //     description: "Please enter a valid phone number",
    //   })
    //   return;
    // }

    // if (paymentType) {
    if (displayedSubTotal < 1 || !displayedSubTotal) {
      toast({
        title: "Error",
        description: "Please add items to the cart to proceed with checkout.",
      });
      return;
    }
    try {
      setLoading(true);
      const productsWithQuantities = cart.map((item) => {
        const product = {
          id: item?.id,
          title: item?.title,
          price: item?.price,
          description: item?.description,
          image: item?.imageUrl || item?.image || item.imageUrls[0],
          quantity: quantities[item?.id] || 1,
          checkoutOptions: checkoutOptions,
        };
        return { ...item, quantity: quantities[item.id] || 1, product };
      });
      const items = productsWithQuantities.map((item) => item.product);

      const docRef = await addDoc(collection(db, "orders"), {
        userId: auth.currentUser?.uid,
        items: items,
        createdAt: serverTimestamp(),
        totalAmount: displayedSubTotal,
        status: "pending",
        paymentStatus: 'paid',
        deliveryTime: null,
        shipping: shipping(),
        subTotal: subtotalWithTax(),
        // paymentType: paymentType,
        billingDetails: formData,
      });

      await updateDoc(docRef, {
        orderId: docRef.id,
      });

      const stripe = await loadStripe(
        "pk_test_51QZoQYG4YE9vsTycPOWeeC92AYLSAa4YDlphJMAEbRi0syPh9L02Mq1GNwFsJhNLNxs2UizSAIvTvsCyPhuDUi4400uqzrSwJp"
      );
      if (!stripe) {
        alert("Stripe failed to initialize.");
        return;
      }
      const body = {
        products: productsWithQuantities,
        orderId: docRef.id,
      };
      const response = await fetch(
        "https://cleopatra-server.vercel.app/api/create-checkout-session",
        {
          // const response = await fetch("https://localhost:7100/api/create-checkout-session",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok")

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      setLoading(false);
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setLoading(false);
    }
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Please select payment type.",
    //   })
    // }
  };
  const shipping = () => {
    // const shipping = 50;
    return 100;
  };

  const subtotalWithTax = () => {
    const taxRate = 0.05;
    const optionsTotal = Object.values(checkoutOptions).reduce<number>(
      (total, price) => total + ((price as number) || 0),
      0
    );
    const totalBeforeTax = displayedSubTotal + optionsTotal;
    const tax = totalBeforeTax * taxRate;
    const total = totalBeforeTax + tax + shipping() - discountedAmount;
    return { total: total.toFixed(2), tax: tax, extras: optionsTotal };
  };

  const handleCoupon = () => {
    if (coupon) {
      const couponCode = coupon.trim();
      const validCoupon = coupons.find((c) => c.couponCode === couponCode);

      if (validCoupon) {
        const discountAmount = (displayedSubTotal * validCoupon.discount) / 100;
        setDiscountedAmount(discountAmount);
        // const newSubtotal = displayedSubTotal - discountAmount;
        // setDisplayedSubTotal(newSubtotal);
        setCouponApply(true);
      } else {
        toast({
          title: "Error",
          description: "Invalid Coupon Code",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter a Coupon Code",
      });
    }
  };

  const handleWishToggle = (watch: Product) => {
    addToWishlist(watch);
    removeFromCart(watch.id);
    console.log("added item to wishlist");
  };

  if (loading) {
    return (
      <div
        className="w-full h-screen flex flex-col justify-center items-center"
        role="status"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const deleteCoupon = () => {
    setCoupon("");
    setCouponApply(false);
    setDiscountedAmount(0);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto md:my-20 my-8 relative p-4">
        <div className="flex flex-col md:flex-row gap-10 md:justify-between items-start">
          <div className="md:w-2/4 w-full font-montserratMedium">
            <BillingDetails
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />

            {/* cards */}
            {/* <div className="mt-6">
              {cart.map((watch) => (
                <div
                  key={watch?.id}
                  className="p-2 mb-10 w-full flex items-center relative justify-between gap-5 shadow"
                >
                  <div className="relative h-80 w-3/4">
                    <Image
                      src={
                        watch.image ||
                        watch.imageUrl ||
                        "/dummy-image-square.jpg"
                      }
                      alt={watch?.title}
                      className="object-cover"
                      fill
                    />
                  </div>

                  <div className="md:w-3/4 w-3/4 font-montserratMedium">
                    <div
                      onClick={() => removeFromCart(watch?.id)}
                      className="p-1 text-black mb-3 bg-white absolute right-2 top-2 cursor-pointer border rounded-full"
                    >
                      <X size={15} />
                    </div>
                    <h2 className="mb-3 font-extrabold font-domine">
                      {watch?.title}
                    </h2>
                    <p className="text-xs mb-3 line-clamp-2">
                      {watch?.description}
                    </p>

                    <div className="flex md:flex-row flex-col gap-3 justify-between text-xl items-center font-domine font-extrabold mb-3">
                      <div className="flex gap-2 border text-lg items-center md:w-2/5 w-full justify-around rounded-md">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleDecrement(watch?.id)}
                        >
                          -
                        </span>
                        <span className="text-sm">
                          {quantities[watch?.id] || 1}
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleIncrement(watch?.id)}
                        >
                          +
                        </span>
                      </div>

                      <h3 className="flex items-end w-full md:w-auto text-lg">
                        {new Intl.NumberFormat("en-US").format(
                          watch?.price * (quantities[watch?.id] || 1)
                        )}
                        <span className="!text-sm ml-1 text-gray-600">
                          {" "}
                          AED
                        </span>
                      </h3>
                    </div>
                    <div className="pt-2 pb-3">
                      <Link
                        href=""
                        className="text-sm underline"
                        onClick={() => handleWishToggle(watch)}
                      >
                        Move To Wishlist
                      </Link>
                    </div>
                    <div>
                    {options.map((option) => (
                      <div
                        key={option?.id}
                        className="flex items-center justify-between space-x-2 mb-2"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name={option?.title}
                            data-price={option?.price}
                            onChange={handleOptionChange}
                          />
                          <label className="text-sm">{option?.title}</label>
                        </div>
                        <span className="text-sm text-gray-500">
                          {option?.price} AED
                        </span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Subtotal */}
          <div className="md:w-2/4 flex md:flex-col flex-col-reverse gap-3">
            {/* <div className="w-full mb-4">
                <div className="flex gap-2">
                <input value={coupon} className="py-3 px-3 border border-gray-300 w-full rounded-md" placeholder="Coupon Code" type="text" onChange={(e) => setCoupon(e.target.value)} />
                <Button className="py-6 rounded-none shadow-none" onClick={handleCoupon}><MoveRight /></Button>
                </div>
              </div> */}

            <div className="flex gap-2 mb-4">
              <input
                value={coupon}
                className={`font-montserratSemiBold py-3 px-3 border border-gray-300 w-full rounded-sm ${
                  couponApply
                    ? "bg-primary border-none focus:outline-none"
                    : "bg-white"
                }`}
                placeholder="Coupon Code"
                type="text"
                onChange={(e) => setCoupon(e.target.value)}
                readOnly={couponApply}
              />
              {couponApply ? (
                <Button
                  className="py-6 rounded-none shadow-none"
                  onClick={deleteCoupon}
                >
                  <X />
                </Button>
              ) : (
                <Button
                  className="py-6 rounded-none shadow-none"
                  onClick={handleCoupon}
                >
                  <MoveRight />
                </Button>
              )}
            </div>
            <div className="w-full p-4 border font-montserratMedium">
              {/* <h1 className="font-bold mb-5 font-domine flex gap-5 items-end border-b p-1">
                your order{" "}<span className="text-base font-medium">({cart.length} items)</span>
              </h1> */}

              {cart.map((watch) => (
                <div
                  key={watch?.id}
                  className="p-2 md:mb-10 mb-5 w-full flex relative justify-between gap-5 "
                >
                  <div className="relative md:h-36 h-60 w-28 md:w-24">
                    <Image
                      src={watch.imageUrls?.[0] || watch.imageUrl}
                      alt={watch?.title || "Product Image"}
                      className="object-cover rounded-md"
                      layout="fill"
                    />
                  </div>

                  <div className="md:w-3/4 font-montserratMedium">
                    <X
                      onClick={() => removeFromCart(watch.id)}
                      size={14}
                      className="absolute right-0 top-0 cursor-pointer"
                    />

                    <h2 className="font-extrabold font-domine md:text-lg mb-1">
                      {watch?.title}
                    </h2>
                    <div className="flex gap-2 items-center text-sm">
                      <div className="flex">
                        <span
                          className="cursor-pointer px-2 p-1 border"
                          onClick={() => handleDecrement(watch?.id)}
                        >
                          -
                        </span>
                        <span className="border px-2 p-1">
                          {quantities[watch?.id] || 1}
                        </span>
                        <span
                          className="cursor-pointer px-2 p-1 border"
                          onClick={() => handleIncrement(watch?.id)}
                        >
                          +
                        </span>
                      </div>
                      x
                      <h3 className="flex gap-1 text-sm">
                        <PriceDisplay
                          amount={watch.price}
                          toCurrency={currency}
                        />
                      </h3>
                    </div>

                    <div className="mt-1.5">
                      {/* {options.map((option) => (
                      <div key={option?.id} className="text-xs flex justify-between mt-[2px]  text-gray-500">
                        <div className="h-3">
                          <input type="checkbox" name={option?.title} data-price={option?.price} onChange={handleOptionChange}/>
                          <label className="text-xs">{option?.title}</label>
                        </div>
                        <PriceDisplay amount={option.price} toCurrency={currency} />
                      </div>
                    ))} */}
                      {options.map((option) => (
                        <div
                          key={option?.id}
                          className="text-xs flex justify-between mt-[2px]  text-gray-500"
                        >
                          <div className="flex gap-1">
                            <input
                              type="checkbox"
                              name={option?.title}
                              data-price={option?.price}
                              onChange={handleOptionChange}
                            />
                            <label className="text-xs">{option?.title}</label>
                          </div>
                          <div className="text-xs">
                            <PriceDisplay
                              amount={option.price}
                              toCurrency={currency}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex md:flex-row flex-col-reverse justify-between mt-2">
                      <h3 className="flex items-center gap-2">
                        Subtotal:{" "}
                        <PriceDisplay
                          amount={watch?.price * (quantities[watch?.id] || 1)}
                          toCurrency={currency}
                        />
                      </h3>

                      <div>
                        <Link
                          href=""
                          className="text-sm underline text-right"
                          onClick={() => handleWishToggle(watch)}
                        >
                          Move To Wishlist
                        </Link>
                      </div>

                      <div></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* culculate sexction */}
              <div className="border-t p-2 text-lg py-4">
                <div className="flex justify-between items-center">
                  <h2>Total:</h2>
                  {/* <h2 className="text-gray-600">
                    {displayedSubTotal.toLocaleString("en-US")}
                    <span className="!text-xs mt-1 text-gray-600"> AED</span>
                  </h2> */}
                  <PriceDisplay
                    amount={displayedSubTotal}
                    toCurrency={currency}
                  />
                </div>
                {/* <div className="text-sm flex gap-1 mt-5">
                  <input
                    onChange={handlePaymentType}
                    type="radio"
                    value="bank"
                    name="paymentStatus"
                    checked={paymentType === "bank"}
                  />
                  Direct bank transfer
                </div>
                <div className="text-sm flex gap-1 mt-2">
                  <input
                    onChange={handlePaymentType}
                    type="radio"
                    value="cash"
                    name="paymentStatus"
                    checked={paymentType === "cash"}
                  />
                  Cash in delivery
                </div> */}

                <div className="flex justify-between items-center mt-5">
                  <h2>Shipping:</h2>
                  {/* <h2 className="text-gray-600">
                    {shipping()}
                    <span className="!text-xs mt-1 text-gray-600"> AED</span>
                  </h2> */}
                  <PriceDisplay amount={shipping()} toCurrency={currency} />
                </div>
                <div className="flex justify-between items-center mt-5">
                  <h2>Extras:</h2>
                  {/* <h2 className="text-gray-600">
                    {subtotalWithTax().extras}
                    <span className="!text-xs mt-1 text-gray-600"> AED</span>
                  </h2> */}
                  <PriceDisplay
                    amount={subtotalWithTax().extras}
                    toCurrency={currency}
                  />
                </div>
                <div className="flex justify-between items-center mt-5">
                  <h2>Sale Tax: (5%)</h2>
                  {/* <h2 className="text-gray-600">5% ({subtotalWithTax().tax.toFixed(2)})</h2> */}
                  <PriceDisplay
                    amount={subtotalWithTax().tax}
                    toCurrency={currency}
                  />
                </div>

                <div className="flex justify-between items-center mt-5">
                  <h2>Subtotal:</h2>
                  {/* <h2 className="text-xl"> {subtotalWithTax().total.toLocaleString()}
                      <span className="!text-xs mt-1"> AED</span>
                    </h2> */}
                  <PriceDisplay
                    amount={subtotalWithTax().total}
                    toCurrency={currency}
                  />
                </div>

                {/* {couponApply && (
                        <div className="text-sm flex gap-1 mt-5">
                          <input onChange={handlePaymentType} type="radio" value="bank" name="paymentStatus"  checked={paymentType === 'bank'} />Direct bank transfer
                      </div>
                      <div className="text-sm flex gap-1 mt-2">
                          <input onChange={handlePaymentType} type="radio" value="cash" name="paymentStatus" checked={paymentType === 'cash'} />Cash in delivery
                      </div>
                </div>
              )} */}

                <AuthModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
                <Button
                  onClick={makePayment}
                  className="uppercase w-full bg-black border hover:bg-transparent hover:text-black hover:border mt-5 hover:border-black text-white font-montserratSemiBold !p-5 px-8"
                >
                  Proceed to Checkout
                </Button>

                {/* <div className="w-full mt-4">
              <div className="flex gap-2">
                <input
                  value={coupon}
                  className="font-montserratSemiBold py-3 px-3 border border-gray-300 w-full rounded-sm"
                  placeholder="Coupon Code"
                  type="text"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                {couponApply ? (
                  <Button
                    className="py-6 rounded-none shadow-none"
                    onClick={deleteCoupon}
                  >
                    <X />
                  </Button>
                ) : (
                  <Button
                  className="py-6 rounded-none shadow-none"
                  onClick={handleCoupon}
                >
                  <MoveRight />
                </Button>
                )}
              </div> */}
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="flex font-montserratSemiBold text-lg mt-5 items-center uppercase"
        >
          <ChevronLeft />
          Back To Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
