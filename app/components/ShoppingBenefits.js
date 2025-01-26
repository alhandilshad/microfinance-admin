import {Truck, FolderOutput, Gift   } from "lucide-react"
const service = [
    {icon: <Truck size={40}/>, title: 'Complimentary Delivery'},
    {icon: <FolderOutput size={40}/>, title: 'easy return or exchange'},
    {icon: <Gift size={40}/>, title: 'Free Gift Wrapping'}
]

export default function ShoppingBenefits (){
    return(
        <div className="my-8 md:my-28 p-10 md:p-28">
            <div className="container mx-auto flex md:flex-row flex-col justify-center gap-16 md:gap-32">
            {service.map((service, index)=>(
                <div key={index} className="flex flex-col items items-center rounded-md text-center justify-center">
                <div className="p-3 shadow-lg rounded-lg mb-5">{service.icon}</div>
                    <h1 className="font-montserratRegular capitalize font-bold">{service.title}</h1>
                </div>
            ))}
            </div>
        </div>
    );
}