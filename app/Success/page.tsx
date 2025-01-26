"use client"
import Link from "next/link";
import {db} from '../../firebase'
import { useEffect, useState } from "react";
import { CheckCircle } from 'lucide-react'
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const Success = () => {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const extractedOrderId = url.searchParams.get("orderId");
    if (extractedOrderId) {
      setOrderId(extractedOrderId);
    }
    }
  }, []);
useEffect(() => {
const updateOrderStatus = async () => {
  if(orderId){
      try {
        const washingtonRef = doc(db, "orders", orderId);
        await updateDoc(washingtonRef, {
          status: "paid",
        });        
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }else{
      toast({
        title: "Error",
        description: "No Order.",
      })
  }
};
if (orderId) {
  updateOrderStatus();
}



}, [orderId]);
  return (
    <div className="min-h-screen font-montserratSemiBold bg-gray-100 flex flex-col items-center justify-center px-4">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div className="animate-bounce mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Order Details:</h2>
        <p className="text-gray-600">{`Order Token: ${orderId || "Not Available"}`}</p>
        <p className="text-gray-600">Estimated Delivery: 6-8 business days</p>
      </div>
      <div className="flex justify-center">
        <Link  href="/" className="inline-block bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"> Return to Home</Link>
        <Link href="/MyOrders" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-4 transition duration-300">View Order</Link>
      </div>
    </div>
  </div>
  );
};
export default Success;