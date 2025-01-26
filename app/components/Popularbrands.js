'use client'
import {useState} from 'react'
import {ChevronRight} from 'lucide-react'
const PopularBrandsNames = [
    'Rolex',
    'Patek Philippe',
    'Breitling',
    'Cartier',
    'IWC',
    'Omega',
    'Audemars Piguet',
    'Tudor',
    'Panerai',
    'Seiko',
    'Tag Heuer',
    'Breguet',
    'Jaeger-LeCoultre',
    'Vacheron Constantin',
    'Richard Mille',
    'Hublot',
    'Zenith',
    'Longines',
    // 'Maurice Lacroix',
    // 'Bell & Ross',

    // 'Longines',
    // 'Maurice Lacroix',
    // 'Bell & Ross',
];

export default function PopularBrands (){
    const [showAll, setShowAll] = useState(false);

    const handleMoreBrands = () =>{
        setShowAll(!showAll); 
    }
    return(
        <div className="container mx-auto my-8 md:my-28 p-4">
            <h1 className="text-2xl md:text-3xl font-bold font-domine">Popular Brands</h1>

            <div className={`grid md:grid-cols-6 grid-cols-2 gap-3 overflow-hidden justify-between mt-10 group relative`}>
                {PopularBrandsNames.map((brand, index) => (
                    <div key={index} className="md:p-3 p-2 text-center bg-primary rounded-lg">
                        <h1 className="font-montserratSemiBold font-bold">{brand}</h1>
                    </div>
                ))}
                <div onClick={handleMoreBrands} className="absolute bg-black text-primary shadow-lg p-1 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out right-0  top-[38%]"><ChevronRight /></div>
            </div>
        </div>
    )
}