"use client"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "firebase/auth";
import {LayoutDashboard, LogOut, User, Heart, Package2, MapPinHouse } from "lucide-react"
import { useCart } from "../context/Context";

const MyAccountSidebar = () => {
    const { user } = useCart();

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            console.log("user is logout");
        })
        .catch((error) => {
            console.log("error", error);
        });
    }
    
  return (
<div className="w-full md:border-r  font-montserratMedium">
    <div>
    <div className="place-items-center">
        
        <div className="w-32 h-32 relative mx-auto">
            <Image src={user?.photoURL} alt="User profile" className="object-contain rounded-full" width={128} height={128} />
          </div>

        <p className="mt-3">{user?.displayName}</p>
        <p className="">{user?.email}</p>
    </div>

        <div className="mt-5">
            <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/MyAccount'><LayoutDashboard/> Dashboard</Link></p>
            <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/MyOrders'><Package2 /> Orders</Link></p>
            {/* <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/MyAccount'><Download /> Downloads</Link></p> */}
            <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/MyAccount'><MapPinHouse /> Addresses</Link></p>
            <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/AccountDetails'><User /> Account Details</Link></p>
            <p className="mt-4"><Link className="flex gap-5 cursor-pointer" href='/WishList'><Heart /> Wishlist</Link></p>
            <p className="mt-4" onClick={handleLogout}><Link className="flex gap-5 cursor-pointer" href='/MyAccount'><LogOut /> Log out</Link></p>
        </div>

    </div>
</div>
  )
}

export default MyAccountSidebar
