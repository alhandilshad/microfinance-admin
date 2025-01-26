"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {MapPin, Phone, Mail, } from "lucide-react"
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { useToast } from "@/hooks/use-toast";

export default function ContactCleopatra(){
    const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email ||!phone ||!message) {
        toast({
            title: "Error",
            description: "Please fill in all fields.",
        })
      return;
    }
    try {
      await addDoc(collection(db, "contactInqueries"), {
        email,
        phone,
        message,
        timestamp: Date.now(),
      });

      setEmail("");
      setPhone("");
      setMessage("");
      toast({
        title: "Success",
        description: "Message submitted successfully",
      })
    } catch (error) {
      console.error("Error adding document:", error);
      toast({
        title: "Error",
        description: "Failed to submit the message. Please try again",
      })
    }
  };

    return(
        <div className="container mx-auto p-4 md:my-28 my-8 font-montserratMedium">
            <h1 className="text-2xl md:text-3xl font-bold font-domine border-b py-3">Contact Cleopatra</h1>
            <div className="flex flex-col-reverse md:flex-row gap-10 justify-between mt-11">
                
                <div className="md:w-2/6">
                    <h1 className="text-2xl font-domine font-bold mb-5">Send Message</h1>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-2 mt-5 rounded-md border bg-transparent placeholder:text-black w-full block" placeholder="Email"/>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="p-2 mt-5 rounded-md border bg-transparent placeholder:text-black w-full block" placeholder="Phone"/>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 mt-5 rounded-md border bg-transparent block w-full" placeholder="Message"></textarea>
                    <Button onClick={handleSubmit} className="mt-5 w-full bg-black text-white hover:bg-white hover:text-black duration-300 uppercase">Submit now</Button>
                </div>

            <div className="md:w-2/6">
                <h2 className="text-2xl font-domine font-bold mb-5">Watch store in Dubai, United Arab Emirates</h2>
                <ul className="flex flex-col md:gap-5 gap-3 text-sm font-montserratSemiBold">
                    <li><Link href='/' className="flex gap-5"><MapPin size={36}/>Alkhatib Building Gold Souk - Al Khor St - Deira Al Sabkha - Dubai, Dubai, United Arab Emirates 80424</Link></li>
                    <li><Link href='/' className="flex gap-5"><Phone/>+971502553602</Link></li>
                    <li><Link href='/' className="flex gap-5"><Mail />Cleopatra@gmail.com</Link></li>
                    <li className="shadow px-4 p-2">Timing is Mon-Sun 10:30am - 9:00pm</li>
                    <p>We are open 7 days a week.</p>
                </ul>
            </div>
                
            </div>
        </div>
    )
}