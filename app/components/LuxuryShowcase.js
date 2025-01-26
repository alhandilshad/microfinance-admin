"use client"
import { useEffect, useState } from 'react'
import {ArrowRight} from 'lucide-react'
import Image from 'next/image'

export default function LuxuryShowcase (){
    const [active, setActive] = useState(0)
    const luxuryItems = [
        {title: "Crafted for Precision: Luxury Watches", disc: "Discover our bold hip-hop pendant jewelry, blending urban style with luxury. Elevate your look with these unique, diamond-studded pieces. ✨👑", img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2021/2/25/2f424dbc-fdb6-4c45-97ab-ce24cfae8a7b1614271764643-1.jpg"},
        {title: "Royal Timepiece", disc: "Explore Our Premium Moissanite watches, showcasing exceptional craftsmanship and diamond elegance. Perfect for those who value both style and precision.⌚💎", img: 'https://cdn.shopify.com/s/files/1/0278/9723/3501/files/49-Richard-Mille-Brands.jpg'},
        {title: "Gold Luxury Watch", disc: "Explore Our Premium Moissanite watches, showcasing exceptional craftsmanship and diamond elegance. Perfect for those who value both style and precision. ⌚💎", img: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2021/2/25/f1b62953-41ba-4f7c-bf75-af297c0c78bf1614262793318-1.jpg'},
        {title: "Timeless Elegance: Diamond Jewelry",disc: "Adorn yourself with our exquisite diamond jewelry, crafted to perfection for every special moment. Unmatched sparkle, eternal beauty. 💍✨",img: "https://emcgtdx36wv.exactdn.com/storage/2022/07/CATEGORY_NECKLACES_IMAGE_HEADER.jpg?lossy=0&webp=90&avif=90&ssl=1"}    
    ]


    useEffect(()=>{
        const timer = setInterval(()=>{
            setActive((prevIndex)=>
                prevIndex == luxuryItems.length - 1 ? 0 : prevIndex + 1
            )
        },3000)
        return () => clearInterval(timer);
    }, [luxuryItems.length])
    return(
        <div className="container mx-auto p-4 md:mb-28 mt-10">
            <div className='flex md:flex-row items-center flex-col justify-between gap-5 md:h-[600px]'>
                <div className='md:w-2/5'>
                <h1 className="text-2xl md:text-3xl font-bold font-domine"> Discover Our Premium Watches</h1>
                <div className='md:mt-10 mt-5'>
                {luxuryItems.map((item, index)=>(
                    <div key={index} onClick={() => setActive(index)} className={`curson-pointer transition-all duration-700 shadow p-5 rounded-md overflow-hidden relative  mt-10 ${active === index ? "py-4" : "py-2"}`} >
                        <div className={`absolute bottom-0 left-0 h-[1px] bg-[#1e4846] transition-all duration-1000 ${ active === index ? "w-full" : "w-0"}`}></div>
                        <div className='flex justify-between items-start'>
                            <h2 className="md:text-xl font-montserratMedium">{item.title}</h2>
                            <ArrowRight className='mt-1' size={18}/>
                         </div>
                        {active === index && (<p className="text-[#1e4846] mt-2 md:text-base text-xs font-montserratMedium">{item.disc}</p>)}
                    </div>
                ))}
                </div>
                </div>

            {/* Image Section */}
            <div className="w-full md:w-2/4 md:h-full relative ">
                <Image src={luxuryItems[active].img} alt={luxuryItems[active].title || "product image"} className="object-cover rounded transition-transform duration-500" layout="fill"/>
            </div>

            </div>
        </div>
    )
}