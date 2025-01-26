"use client";
import { useState } from "react";
import {
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useAppContext } from "../../context/Context";
import { X, Undo2, Check, Search } from "lucide-react";
import Image from "next/image";

export default function OrderList() {
  const { orders, setOrders } = useAppContext();
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailLoading, setIsOrderDetailLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) =>
    filter === "All" ? true : order.status === filter || 
    order.items[0]?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateStatus = async (orderId, e) => {
    const newStatus = e.target.value;
    const orderRef = doc(db, "orders", orderId);

    if (newStatus === "delivered") {
      await updateDoc(orderRef, {
        status: newStatus,
        deliveryTime: serverTimestamp(),
      });
    } else {
      await updateDoc(orderRef, {
        status: newStatus,
        deliveryTime: null,
      });
    }
    setOrders((prevOrders) =>
      prevOrders?.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <main>
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e4846]">Order History</h2>
            <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-full px-5 py-2 pl-10 text-sm shadow-sm focus:outline-none focus:border-[#1e4846] focus:ring-1 focus:ring-[#1e4846] transition duration-300"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="rounded-lg w-96 md:w-auto overflow-scroll">
              <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 font-semibold">Order Items:</th>
                    <th className="py-3 text-md font-semibold text-left">Customer</th>
                    <th className="py-3 text-md font-semibold text-left px-12">Date</th>
                    <th className="py-3 text-md font-semibold text-left">Items</th>
                    <th className="py-3 text-md font-semibold text-left">Total</th>
                    <th className="py-3 text-md font-semibold text-left">Status</th>
                    <th className="py-3 text-md font-semibold text-left">Order ID</th>
                    <th className="py-3 text-md text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders?.map((order) => (
                    <tr
                      key={order.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewOrder(order)}
                    >
                      <td className="py-4 text-sm flex items-center gap-4">
                        <img
                          src={order.items[0]?.image}
                          alt={`product ${order.title} image`}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <h3>{order.items[0]?.title}</h3>
                      </td>
                      <td className="py-4 text-sm text-[#1e4846]">
                        {order?.formData?.firstName} {order?.formData?.lastName}
                      </td>
                      <td className="text-gray-500 text-sm px-6">
                        {order?.createdAt
                          ?.toDate()
                          .toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                      </td>

                      <td className="py-4 text-sm text-gray-500 px-6">
                        {order.items.length}
                      </td>
                      <td className="py-4 text-sm text-[#1e4846]">
                        {order.totalAmount.toLocaleString("en-US")}
                      </td>
                      <td className="px-4">
                        <div
                          className={`p-3 rounded-lg text-sm font-semibold text-center border capitalize ${
                            order.status === "paid"
                              ? "text-green-600 bg-green-50 border-green-600"
                              : order.status === "pending"
                              ? "text-yellow-500 bg-yellow-50 border-yellow-500"
                              : order.status === "cancelled"
                              ? "text-red-600 bg-red-50 border-red-600"
                              : order.status === "delivered"
                              ? "text-green-500 bg-green-50 border-green-500"
                              : order.status === "shipped"
                              ? "text-blue-600 bg-blue-50 border-blue-600"
                              : "text-gray-600 bg-gray-50 border-gray-300"
                          }`}
                        >
                          {order.status}
                        </div>
                      </td>
                      <td className="py-4 text-sm text-[#1e4846]">
                        {order.orderId}
                      </td>
                      <td className="py-4 flex gap-5 justify-end">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e)}
                          className="border"
                        >
                          <option value="pending">Pending</option>
                          <option value="delivered">Delivered</option>
                          <option value="shipped">Shipped</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders?.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                  No orders found.
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e4846] bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg md:w-96 md:w-auto  p-6">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            {selectedOrder && (
              <table className="min-w-full table-auto">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Order ID:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {selectedOrder.id}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Customer:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {selectedOrder?.formData?.firstName} {selectedOrder?.formData?.lastName}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Date:
                    </td>
                    <td className="text-gray-500 text-sm px-6">
                      {selectedOrder?.createdAt
                        ?.toDate()
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Status:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {selectedOrder.status}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Checkout Options:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 flex flex-col">
                      {selectedOrder.items[0]?.checkoutOptions?.braceletAdjustment === true ? (
                        <div><Check  size={18} color="green" className="inline-block" /> braceletAdjustment</div>
                      ) : (
                        <div><X  size={18} color="red" className="inline-block" /> braceletAdjustment</div>
                      )}
                      {selectedOrder.items[0]?.checkoutOptions?.engraving === true ? (
                        <div><Check size={18} color="green" className="inline-block" /> engraving</div>
                      ) : (
                        <div><X size={18} color="red" className="inline-block" /> engraving</div>
                      )}
                      {selectedOrder.items[0]?.checkoutOptions?.giftWrapping === true ? (
                        <div><Check  size={18} color="green" className="inline-block" /> giftWrapping</div>
                      ) : (
                        <div><X size={18} color="red" className="inline-block" /> giftWrapping</div>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Address:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {selectedOrder?.formData?.address}, {selectedOrder?.formData?.streetAddress}, {selectedOrder?.formData?.state}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Total:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {selectedOrder.totalAmount.toLocaleString("en-US")}
                    </td>
                  </tr>

                  {selectedOrder.items?.map((item, index) => (
                    <tr
                      className="border cursor-pointer"
                      key={index}
                      onClick={() => handleViewItems(item, selectedOrder)}
                    >
                      <td className="px-4 py-2 font-semibold text-gray-700">
                        Item {index + 1}:
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {item.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {itemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e4846] bg-opacity-50">
          <div className="bg-white relative rounded-lg shadow-lg md:w-2/5 flex flex-col justify-between p-6">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setItemModal(false)}
            />
            <Undo2
              className="absolute top-4 left-4 cursor-pointer"
              onClick={() => {
                setItemModal(false);
                setIsModalOpen(true);
              }}
            />
            <h3 className="text-xl font-bold text-center mb-4">Watch detail</h3>

            {/* Loading Indicator */}
            {isOrderDetailLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : orderDetails ? (
              <table>
                <tbody>
                  <tr>
                    <td className="h-[200px] relative ">
                      <Image
                        src={orderDetails?.imageUrl}
                        alt={`product ${orderDetails.title} image`}
                        className="object-contain w-ufll h-full rounded-full"
                        fill
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Category:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {orderDetails.category}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Name:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {orderDetails.title}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Description:
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-800">
                      {orderDetails.description}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">
                      Total:
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {orderDetails.price.toLocaleString("en-US")}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">
                No details available for this item.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
