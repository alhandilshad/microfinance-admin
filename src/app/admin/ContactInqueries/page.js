"use client";
import React from "react";
import { useAppContext } from "../../context/Context";
import { Trash } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const page = () => {
  const { inqueries, setInqueries } = useAppContext();

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "contactInqueries", id));
    const updatedInqueries = inqueries.filter((item) => item.id !== id);
    setInqueries(updatedInqueries);
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-gray-600 to-gray-800 text-white uppercase text-sm">
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Message</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inqueries.length > 0 ? (
            inqueries.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-4 px-4 text-gray-800">
                  {contact.email}
                </td>
                <td className="py-4 px-4 text-gray-800">
                  {contact.phone}
                </td>
                <td className="py-4 px-4 text-sm">
                  {contact.message}
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">
                  {new Date(contact.timestamp).toLocaleString()}
                </td>
                <td>
                  <Trash
                    onClick={() => handleDelete(contact.id)}
                    className="w-5 h-5 text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-8 text-gray-500"
              >
                No Inqueries Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
