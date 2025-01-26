import Image from "next/image"
// import { Link } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function TimelessEleganceSection(){
    return(
    <div className="relative md:h-screen h-[60vh] w-full overflow-hidden">
            <Image src="/watchesCollection.jpg" alt="Luxury watch background" layout="fill" objectFit="cover" quality={100}className="z-0"/>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-domine font-bold text-center mb-4">Timeless Elegance</h2>
                <p className="text-lg md:text-3xl text-center max-w-3xl font-montserratMedium">Discover our collection of exquisite timepieces, crafted with precision and style.</p>
                <Link href="/Store"> 
                    <Button className="mt-8 px-6 py-3 bg-white text-black font-montserratMedium rounded-full hover:bg-opacity-90 transition duration-300">Explore Collection</Button>
                </Link>
            </div>
    </div>
    )
}