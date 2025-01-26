"use client";
import { Search } from "lucide-react";
import { useAppContext } from "../../context/Context";
import React, { useState } from "react";

const UsersPage = () => {
  const { users, fetchUsers } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers List</h1>
          <p className="text-sm text-gray-500">
            Manage all registered users here
          </p>
        </div>
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
      </div>
      <div className="bg-white rounded-lg w-96 md:w-auto  md:w-auto overflow-scroll">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers?.map((user, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    <img
                      className="w-12 h-12"
                      src={
                        user.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH41aGz2eaeJbKuRNAawocn9ummGUZovlfGg&s"
                      }
                      alt="user's photo"
                    ></img>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    {user.role || "User"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm border-b">
                    <div className="flex items-center gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-3 text-center text-gray-500 text-sm"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 py-4">
        <button
          className="px-3 py-1 border rounded text-sm"
          onClick={() => fetchUsers(true)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
