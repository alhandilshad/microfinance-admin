"use client"
import Image from "next/image";
import {UserRound } from 'lucide-react'

const MyAccountBanner = () =>{
return(
    <div className="relative h-96">
          <div className="w-full">
            <Image src="/myAccountBanner.png" className="object-cover md:hidden block w-full h-full" alt="Banner" fill/>
            <Image src="/myAccountNewBanner.webp" className="object-cover md:block hidden w-full h-full" alt="Banner" fill/>
            <div className="absolute h-full inset-0  md:hidden block bg-gradient-to-b opacity-90 from-transparent to-black"></div>
          </div>
    
          <div className="container h-full z-40 text-white flex flex-col justify-center items-center bottom-0 inset-0 absolute mx-auto md:p-0 p-5">
            <h1 className="mb-4 flex items-center gap-3 md:text-5xl text-2xl font-extrabold font-domine"><UserRound width={40} height={40}/>My account</h1>
          </div>
    </div>
)
}

export default MyAccountBanner;