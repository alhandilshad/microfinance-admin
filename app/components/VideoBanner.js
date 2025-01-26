import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function VideoBanner ({videoPath}){
    return(
        <div className="video-banner relative md:h-[84vh] h-[81vh]">
            <video autoPlay muted loop className="h-full w-full object-cover playsInline webkit-playsinline">
                <source src={videoPath} type="video/mp4"/>
            </video>

            <div className="absolute h-full inset-0 bg-gradient-to-b opacity-70 from-transparent to-black"></div>


            <div className="md:w-2/5 absolute  bottom-10 p-4 text-white left-0 right-0 text-center mx-auto ">
                <h1 className="text-3xl font-extrabold font-domine">Cleopatra Watches & Jewellery</h1>
                <h4 className="font-bold font-montserratSemiBold text-sm my-5">Cleopatra Watches & Jewellery 💎 We Specialize In Luxury Watches</h4>
                <Button className="border bg-transparent font-extrabold font-montserratSemiBold hover:bg-black" variant="default" size="lg"><Link href='/Store'>Buy Watches</Link> </Button>
            </div>

        </div>
    )
}
