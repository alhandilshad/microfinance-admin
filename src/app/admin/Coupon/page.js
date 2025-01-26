"use client";

import { useState, } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Edit, Trash2 } from "lucide-react";
import { useAppContext } from "../../context/Context";

export default function Dashboard() {
  const { coupons } = useAppContext();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [couponId, setCouponId] = useState();

  const handleAddCoupon = async () => {
    if (!couponCode || !discount || !expiryDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      if (isEdit) {
        await updateDoc(doc(db, "coupons", couponId), {
          couponCode,
          discount: parseInt(discount),
          expiryDate,
        });
        alert("Coupon updated successfully!");
        setIsEdit(false);
        setCouponId(null);
      } else {
        await addDoc(collection(db, "coupons"), {
          couponCode,
          discount: parseInt(discount),
          expiryDate,
          createdAt: serverTimestamp(),
        });
        alert("Coupon added successfully!");
      }
      setCouponCode("");
      setDiscount("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const deleteCoupon = async (couponId) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      try {
        await deleteDoc(doc(db, "coupons", couponId));
        alert("Coupon deleted successfully!");
      } catch (error) {
        console.error("Error deleting coupon:", error);
        alert("Failed to delete coupon. Try again.");
      }
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-2xl font-bold text-[#1e4846] mb-6">
          {isEdit ? "Update Coupon" : "Add Coupon"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon Code
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="mt-1 rounded-md px-3 py-2 w-full border border-gray-400 sm:text-sm"
              placeholder="Enter coupon code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 rounded-md px-3 py-2 w-full border border-gray-400 sm:text-sm"
              placeholder="Enter discount percentage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 rounded-md px-3 py-2 w-full border border-gray-400 sm:text-sm"
            />
          </div>
          <button
            onClick={handleAddCoupon}
            className="w-full bg-[#1e4846] hover:bg-gray-950 duration-300 text-white py-2 px-4 rounded-md"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-md p-6 mt-8">
        <h2 className="text-2xl font-bold text-[#1e4846] mb-4">
          Available Coupons
        </h2>
        {coupons.length > 0 ? (
          <ul className="space-y-4">
            {coupons?.map((coupon) => (
              <li
                key={coupon.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-lg">{coupon.couponCode}</h3>
                  <p className="text-sm text-gray-600">
                    Discount: {coupon.discount}% | Expires on:{" "}
                    {coupon.expiryDate}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">
                    Added: {coupon.createdAt?.toDate()?.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2 justify-end mt-2">
                    <Edit
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setCouponCode(coupon.couponCode);
                        setDiscount(coupon.discount);
                        setExpiryDate(coupon.expiryDate);
                        setCouponId(coupon.id);
                        setIsEdit(true);
                      }}
                    />
                    <Trash2
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => deleteCoupon(coupon.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No coupons available.</p>
        )}
      </div>
    </main>
  );
}
