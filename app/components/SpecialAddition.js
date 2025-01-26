import { ArrowRight } from "lucide-react"
import Card from "./Card"
import { useCart } from "../context/Context"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function SpecialAddition (){
    const { watches } = useCart()
    const limitedWatches = watches.slice(0, 8);

    return(
        <div className="container mx-auto p-3 md:my-28 min-h-96">
            <div className="flex justify-between border-b pb-5">
                <h1 className="text-2xl md:text-3xl font-bold font-domine ">Special Addition</h1>
                <h1 className="font-domine font-semibold"><Link href='/Store' className="p-1 flex gap-2 items-center ">View more <ArrowRight size={12}/></Link></h1>
            </div>

            {limitedWatches.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} className="w-full h-72 bg-gray-200" />
                    ))}
                </div>
            ) : (
                <Card products={limitedWatches} />
            )}
        </div>
    )
}