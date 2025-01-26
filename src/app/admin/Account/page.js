"use client";
import React from "react";
import { useAppContext } from "../../context/Context";

const Profile = () => {
  const { currentUser } = useAppContext();

  return (
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden">
        <div className="relative bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 p-8 text-white">
          <div className="flex items-center gap-6">
            <img
              src={currentUser?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-extrabold">{currentUser?.name || "Admin"}</h1>
              <p className="text-lg opacity-90">{currentUser?.email || "admin@example.com"}</p>
              <p className="mt-2 text-sm italic">
                Role: <span className="font-medium">Administrator</span>
              </p>
            </div>
          </div>
          <button className="absolute top-8 right-8 bg-white text-yellow-600 px-4 py-2 rounded-lg shadow hover:bg-yellow-50">
            Edit Profile
          </button>
        </div>
        <section className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800">About</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Welcome to the Cleopatra Watches and Jewellery Store admin panel. Here, you can manage
            store operations, monitor sales, and update user preferences. This profile page provides
            a summary of your information and allows quick access to essential actions.
          </p>
        </section>
        <section className="p-8 border-t">
          <h2 className="text-2xl font-semibold text-gray-800">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-gray-500 font-medium">Full Name</h3>
              <p className="text-gray-800">{currentUser?.name || "Not provided"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-gray-500 font-medium">Email Address</h3>
              <p className="text-gray-800">{currentUser?.email || "Not provided"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-gray-500 font-medium">Role</h3>
              <p className="text-gray-800">Administrator</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-gray-500 font-medium">Joined Date</h3>
              <p className="text-gray-800">{currentUser?.joinedDate || "01 Jan 2023"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-gray-500 font-medium">Phone</h3>
              <p className="text-gray-800">{currentUser?.phone || "+123 456 7890"}</p>
            </div>
          </div>
        </section>
        <section className="p-8 border-t">
          <h2 className="text-2xl font-semibold text-gray-800">Activity Logs</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-full">
                📦
              </span>
              <div>
                <p className="font-medium">Updated product inventory</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-full">
                🛒
              </span>
              <div>
                <p className="font-medium">Reviewed customer order #1234</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-full">
                ✍️
              </span>
              <div>
                <p className="font-medium">Edited store banner</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="p-8 border-t">
          <h2 className="text-2xl font-semibold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <button className="p-4 bg-slate-700 text-white rounded-lg shadow hover:bg-slate-800">
              Manage Products
            </button>
            <button className="p-4 bg-slate-700 text-white rounded-lg shadow hover:bg-slate-800">
              View Orders
            </button>
            <button className="p-4 bg-slate-700 text-white rounded-lg shadow hover:bg-slate-800">
              Update Store Details
            </button>
            <button className="p-4 bg-slate-700 text-white rounded-lg shadow hover:bg-slate-800">
              Contact Support
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 bg-gray-100 text-center border-t">
          <p className="text-gray-600 text-sm">
            Cleopatra Watches and Jewellery Store Admin Panel © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
  );
};

export default Profile;