"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import PriceDisplay from "@/app/components/PriceDisplay";
import { useCart } from "@/app/context/Context";

export default function Page() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { currency } = useCart();
  const { id } = useParams();

  interface OrderData {
    orderId: string;
    createdAt: { toDate: () => Date };
    name?: string;
    city?: string;
    phone?: string;
    items: { title: string; quantity: number; price: number }[];
    totalAmount: number;
    shipping?: string;
    subTotal?: { tax: number; total: number };
  }

  const getOrder = async (id: string) => {
    try {
      if (typeof id === "string") {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (docSnap.data().userId) {
            const userDocRef = doc(db, "users", docSnap.data()?.userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              setOrderData({
                orderId: docSnap.data().orderId,
                createdAt: docSnap.data().createdAt,
                items: docSnap.data().items,
                totalAmount: docSnap.data().totalAmount,
                name: userDocSnap.data()?.name,
                city: docSnap.data().city,
                phone: docSnap.data().phone,
                shipping: docSnap.data().shipping,
                subTotal: docSnap.data().subTotal,
              });
            }
          }
        } else {
          console.log("No order document found");
        }
      } else {
        console.error("Invalid id type");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      getOrder(id);
    }
  }, [id]);

  console.log("orderData", orderData);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="container mx-auto p-4">
        {orderData ? (
            <div className="bg-white mx-auto md:w-3/5 p-10 rounded-md">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="uppercase text-3xl font-extrabold font-domine">
                      Invoice
                    </th>
                  </tr>
                  <tr className="flex justify-between w-full mt-5">
                    <th className="uppercase text-3xl font-extrabold font-domine">
                      Rolex
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">Order id:</td>
                    <td>#{orderData?.orderId}</td>
                  </tr>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">Order Date</td>
                    <td>
                      {orderData?.createdAt
                        ?.toDate()
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </td>
                  </tr>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">Customer Name</td>
                    <td>{orderData?.name || "N/A"}</td>
                  </tr>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">
                      Customer Address
                    </td>
                    <td>Gulsan e iqbal block 5 new dhoraji A phase(A67)</td>
                  </tr>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">Customer City</td>
                    <td>{orderData?.city || "N/A"}</td>
                  </tr>
                  <tr className="flex justify-between w-full mt-3">
                    <td className="font-montserratSemiBold">Phone</td>
                    <td>{orderData?.phone || "N/A"}</td>
                  </tr>
                  <tr className="grid grid-cols-4 text-center justify-between w-full mt-3 bg-black text-white p-2 rounded-md font-montserratSemiBold ">
                    <td>Item</td>
                    <td>Quantity</td>
                    <td>Rate</td>
                    <td>Amount</td>
                  </tr>
                  {orderData?.items?.length > 0 ? (
                    orderData.items.map((item, index) => (
                      <tr key={index} className="grid grid-cols-4 text-center justify-between w-full mt-3">
                        <td className="font-montserratSemiBold text-left">
                          {item.title}
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        {/* <td>{orderData.totalAmount || "N/A"}</td> */}
                        <td>{item.quantity * item.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No items available
                      </td>
                    </tr>
                  )}
                  <tr className="flex justify-end gap-10 mt-3">
                    <td className="font-montserratSemiBold">Subtotal</td>
                    <PriceDisplay amount={orderData?.totalAmount} toCurrency={currency} />
                    </tr>
                  <tr className="flex justify-end gap-10 mt-3">
                    <td className="font-montserratSemiBold">Sales Tax (5%)</td>
                    <PriceDisplay amount={orderData?.subTotal?.tax} toCurrency={currency} />
                  </tr>
                  <tr className="flex justify-end gap-10 mt-3">
                    <td className="font-montserratSemiBold">Shipping</td>
                    <PriceDisplay amount={orderData?.shipping} toCurrency={currency} />
                  </tr>
                  <tr className="flex justify-end gap-10 mt-3">
                    <td className="font-montserratSemiBold text-lg">Total</td>
                    <PriceDisplay amount={orderData?.subTotal?.total} toCurrency={currency} />
                    </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <p>Loading...</p>
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
}
