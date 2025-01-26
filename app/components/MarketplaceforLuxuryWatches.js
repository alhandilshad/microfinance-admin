import Image from "next/image"

const LuxuryWatches = [
    {img: '/buyer-rating.svg', title: '4.8 out of 5 stars', desc: 'from 167,000 reviews worldwide'},
    {img: '/love-my-watch.svg', title: '9 million', desc: 'watch enthusiasts use Cartier each month'},
    {img: '/handshake.svg', title: 'Over 200,000', desc: 'customers choose Buyer Protection annually'},
    {img: '/dealer.svg', title: 'More than 25,000', desc: 'trustworthy sellers'},
]
export default function MarketplaceforLuxuryWatches (){
    return(
        <div className="container mx-auto my-8 md:my-28 p-4">
            <h1 className="font-domine text-2xl md:text-3xl font-bold">The Leading Marketplace for Luxury Watches Since 2003</h1>
            <div className="grid md:grid-cols-4 grid-cols-1 justify-between mt-10 gap-5 items-stretch">
                {LuxuryWatches.map((watch, index)=>(
                    console.log(watch?.img),
                    
                    <div key={index} className="bg-primary w-full rounded-lg text-center p-4 ">
                        <Image src={watch?.img} width={100} height={100} alt={watch?.title} className="mx-auto"/>
                        <h1 className="font-domine text-lg font-bold my-2">{watch?.title }</h1>
                        <p className="font- text-gray-600 text-sm font-montserratMedium">{watch?.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}