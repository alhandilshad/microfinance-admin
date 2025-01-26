import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {ChevronRight} from "lucide-react"

const DiscoverNow = () => {
  return (
<div className=''>
    <div className=' flex md:flex-row flex-col justify-center relative w-full h-[65vh]'>
        <div className='text-[#bfdace] md:w-2/5 bg-[#2c5150] p-5 md:p-10 md:h-full'>
                <h3 className='font-bold mb-6 font-montserratMedium'>Discover Rolex </h3>
                <h1 className='md:text-4xl text-2xl font-montserratSemiBold'>Rolex at Cleopatra Watches & Jewellery</h1>
                <p className='md:text-lg mt-6 font-montserratMedium'>Discover our exclusive new arrivals and offers from Rolex, and start the new year with your favorite Rolex model!</p>
                <button className='bg-[#bfdace]  text-[#2c5150] p-4 font-montserratSemiBold rounded-2xl md:absolute bottom-10 mt-7'><Link className='flex' href='/Store'>Discover Now <ChevronRight /></Link></button>
            </div>
            <div className='md:w-4/5 relative h-full'>
                <Image src="/rolex.webp" className="w-full object-cover h-full" alt='rolex image' fill/>
            </div>
    </div>

    <div className='flex md:flex-row flex-col gap-10 my-10 justify-between container mx-auto'>
        <div className='flex justify-center md:w-2/4'>
            <Image width={120} height={120} className='mr-4 object-contain' src="/CertifiedOriginal.png" alt='Certified Original image'/>
            <div>
                <h1 className='mb-3 font-montserratSemiBold md:text-lg text-[#2c5150]'>Cleopatra Watches & Jewellery Certified Original</h1>
                <p className='md:text-[14px] text-sm text-[#2c5150] font-montserratRegular'>At Cleopatra Watches & Jewellery, we take pride in offering selection of luxurious luxury watches and diamond jewelry the authenticity of each timepiece is guaranteed by our highly skilled team</p>
            </div>
        </div>

        <div className='flex justify-center md:w-2/4'>
            <Image width={120} height={120} className='mr-4 object-contain' src="/WarrantyCoverage.png" alt='Warranty image'/>
            <div>
                <h1 className='mb-3 font-montserratSemiBold md:text-lg text-[#2c5150]'>Cleopatra Watches & Jewellery Warranty</h1>
                <p className='md:text-[14px] text-sm text-[#2c5150] font-montserratRegular'>At Cleopatra Watches & Jewellery, we not only guarantee the authenticity but also offer a comprehensive warranty to ensure your complete satisfaction and peace of mind</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default DiscoverNow
