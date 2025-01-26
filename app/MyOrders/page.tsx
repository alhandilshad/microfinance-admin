"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db, auth } from "../../firebase";
import { useState, useEffect } from "react";
import { Product, useCart } from "../context/Context";
import { ChevronRight, Dot, Check } from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
// import { Product } from "../context/Context";
import PriceDisplay from "../components/PriceDisplay";
import { useToast } from "@/hooks/use-toast";

type OrderItem = Product & {
  quantity: number;
  description?: string;
};
type Order = {
  orderId: string;
  description: string;
  createdAt: { toDate: () => Date };
  totalAmount: number;
  status: "pending" | "paid" | "cancelled" | "delivered";
  items: OrderItem[];
  deliveryTime?: { toDate: () => Date };
};

const Page = () => {
  const { toast } = useToast();
  const { addToCart, cart, user, currency } = useCart();
  const [lastVisible, setLastVisible] = useState<unknown | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  console.log("🚀 ~ Page ~ orders:", orders[0]?.items)
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (userId: string, lastVisible: unknown) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      if (lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const ordersList: Order[] = [];

      querySnapshot.forEach((doc) => {
        const orderData = doc.data() as Order;
        ordersList.push({ ...orderData });
      });

      setOrders((prevOrders) => {
        return [...prevOrders, ...ordersList];
      });

      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in:", user);
        fetchOrders(user.id, lastVisible);
      } else {
        console.log("No user logged in.");
        // alert("No user logged in.");
        setLoading(false);
      }
    // });

    // return () => unsubscribe();
  }, [user]);

  const handleSeeMore = () => {
    if (lastVisible) {
      const user = auth.currentUser;
      if (user) {
        fetchOrders(user.uid, lastVisible);
      }
    }
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
  const handleBuyItAgain = (watch: Product) => {
    const isAlreadyInCart = cart.some((item) => item?.id === watch?.id);

    if (isAlreadyInCart) {
      toast({
        title: "Error",
        description: "This item is already in the cart",
      })
      return;
    }
    addToCart(watch);
    location.href = "/Checkout";
  };

  // const handleViewOrder = (item) =>{
  //   console.log("yeh onclick pe item dikhayega", item);
  //   setViewOrder(true)
  // }

  // // useEffect(() => {
  // //   if (orders) {
  // //     console.log("hajra mai yeh test kar rahi hun", orders.length);
  // //   }
  // // }, [orders]);

  return (
    <div>
      <Header />
      <div className="container font-montserratMedium md:my-20 p-4 m-auto min-h-screen">
        {orders && orders && orders.length > 0 ? (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-domine flex gap-5 items-end">
              My Order History
            </h1>
            <p className="my-2 text-gray-500 ">
              Check the status of recent orders, manage returns, and discover
              similar products
            </p>
            {orders &&
              orders.map((item, index) => (
                // console.log(item, "item"),

                <div key={index} className=" shadow-md rounded-lg mt-10">
                  <div className="w-full overflow-auto border flex justify-between border-b items-center p-1 md:py-5 px-2">
                    <div>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="font-montserratSemiBold">
                            <th className="text-left text-xs md:text-base md:px-6 px-2">Order Id</th>
                            <th className="text-left text-xs md:text-base md:px-6 pr-14  py-2">
                              Date Placed
                            </th>
                            <th className="text-left text-xs md:text-base md:px-6 pr-10 px-2">
                              Total Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="md:px-6 px-2 text-xs md:text-base">#{item?.orderId}</td>
                            <td className="md:px-6 px-2 text-xs md:text-base">
                              {item?.createdAt
                                ?.toDate()
                                .toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                            </td>
                            <td className="md:px-6 px-2 text-xs md:text-base">
                              {/* {" "}
                              {new Intl.NumberFormat("en-US").format(
                                item?.totalAmount
                              )} */}
                              <PriceDisplay amount={item.totalAmount} toCurrency={currency} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex md:px-6 px-2">
                      {/* <button onClick={() => handleViewOrder(item)} className="rounded-lg mr-5 border border-dashed border-orange-500 p-2 md:px-4 md:text-sm text-xs ">View Order</button> */}
                      <button className="rounded-lg border border-dashed border-orange-500 p-2 md:px-4 md:text-sm text-xs ">
                        <Link href={`/Invoice/${item?.orderId}`} passHref>
                          View Invoice
                        </Link>
                      </button>
                    </div>
                  </div>

                  {/* viewOrder modal */}

                  {/* {viewOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
              <div className="bg-white p-10 rounded-md relative shadow-lg font-montserratSemiBold w-full font-montserratSemiBold max-w-lg">
                <button className="absolute top-4 right-6" onClick={() => setViewOrder(false)}><X /></button>
                <h2 className="text-2xl my-5">Order details</h2>

                <div className="flex gap-5 text-white justify-center">
                  {orders && orders.length === 1 ? (
                    <div>order item 1</div>
                  ):(
                    <div>order item is more then 1</div>
                  )}
                </div>
              </div>
            </div>
        )} */}

                  {item?.items.map((watch, key) => (
                    <div key={key} className="mb-5 shadow-sm p-3 md:p-4">
                      <div className="flex justify-between mb-5">
                        <p
                          className={`pl-2 pr-3 py-1 rounded-full flex items-center text-xs font-montserratSemiBold capitalize ${
                            item?.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : item?.status == "paid"
                              ? "bg-blue-100 text-blue-800"
                              : item?.status == "cancelled"
                              ? "bg-red-100 text-red-800"
                              : item?.status == "delivered"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }`}
                        >
                          <Dot />
                          {item?.status}
                        </p>
                      </div>
                      <div className="flex md:flex-row flex-col justify-between">
                        <div className="flex justify-start gap-5">
                          <div className="w-60 h-44 relative">
                            <Image
                              src={watch?.image || watch.image[0] || "/dummy-image-square.jpg"}
                              alt={watch.title}
                              className="object-cover rounded-lg w-full h-full"
                              fill
                            />
                          </div>
                          <div className="w-3/4 font-montserratSemiBold">
                            <h3 className="md:text-base text-sm font-montserratSemiBold">
                              {watch.title}
                            </h3>
                            <p className="line-clamp-2 md:text-sm text-xs text-gray-600 my-2">
                              {watch?.description || watch?.disc}
                            </p>
                            <p className="md:text-sm text-xs">
                              Qty - {watch.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="md:w-2/4 text-right">
                          {/* <h5 className="mx-5 text-2xl font-extrabold">
                            {new Intl.NumberFormat("en-US").format(watch.price)}{" "}
                            <span className="text-gray-600 !text-sm !mt-5">
                              AED{" "}
                            </span>
                          </h5> */}
                          
                        </div>
                      </div>
                      <div>
                        {item?.deliveryTime ? (
                          <div className="flex md:justify-between font-montserratSemiBold items-start gap-5 md:items-center md:flex-row flex-col-reverse mt-5">
                            <div>
                              <div className="flex text-gray-500 gap-2 items-center text-xs md:text-sm">
                                {" "}
                                <div className="p-1 bg-green-400 text-white rounded-full">
                                  <Check size={12} />
                                </div>{" "}
                                Delivered On{" "}
                                {item?.deliveryTime
                                  ?.toDate()
                                  .toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                              </div>
                            </div>
                            <div className="flex justify-end md:gap-10 gap-5">
                              <Link href={`/Store/SeeDetails`} passHref>
                                <button className="md:text-sm text-xs font-montserratSemiBold underline transition-colors duration-150 ease-in-out flex items-center">
                                  Buy Again
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                              </Link>
                              <button className="md:text-sm text-xs font-montserratSemiBold underline transition-colors duration-150 ease-in-out flex items-center">
                                View product
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end md:gap-10 gap-5 mt-5 ">
                            <button
                              onClick={() => handleBuyItAgain(watch)}
                              className="md:text-sm text-xs font-montserratSemiBold underline transition-colors duration-150 ease-in-out flex items-center"
                            >
                              Buy Again
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                            <Link
                              href={`/Store/SeeDetails/${watch?.id}`}
                              passHref
                            >
                              <button className="md:text-sm text-xs font-montserratSemiBold underline transition-colors duration-150 ease-in-out flex items-center">
                                View product
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
            {orders.length % 5 === 0 && !loading && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSeeMore}
                  className="text-blue-600 underline"
                >
                  See More
                </button>
              </div>
            )}

          </div>
        ) : (
          <p className="text-center text-1xl font-merriweather">
            Order Not found
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Page;
