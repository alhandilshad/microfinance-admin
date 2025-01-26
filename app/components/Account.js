import Link from 'next/link'
import {User, Package2, MapPinHouse } from "lucide-react"
import { useCart } from '../context/Context';

export default function Account() {
  const { user } = useCart();
  return (
    <div>
        <h1 className='font-domine font-bold text-3xl my-3'>Welcome to your account page</h1>
        <p className='font-montserratRegular'>Hey <span className='font-montserratSemiBold capitalize'>{user?.displayName || user?.name}</span>, Today is a great day to check your account page. You can also check</p>
        <div className='mt-5 flex md:flex-row flex-col gap-5 font-montserratSemiBold'>
            <Link href="/MyOrders"><button className="flex gap-3 md:place-content-left p-2 px-4 w-full bg-gray-800 rounded-md cursor-pointer text-white"><Package2/> Recent Order</button></Link>
            <Link href="/"><button className="flex gap-3 md:place-content-left p-2 px-4 w-full bg-gray-800 rounded-md cursor-pointer text-white"><MapPinHouse/> Addresses</button></Link>
            <Link href="/AccountDetails"><button className="flex md:place-content-left gap-3 p-2 px-4 w-full bg-gray-800 rounded-md cursor-pointer text-white"><User/> Account details</button></Link>
        </div>
    </div>
  )
}
