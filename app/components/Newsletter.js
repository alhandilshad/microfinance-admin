"use client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { db } from "@/utils/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
export default function Newsletter (){
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!email) {
            toast({
                title: "Error",
                description: "Please enter email address",
            })
          return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast({
              title: "Error",
              description: "Please enter a valid email address",
            });
            return;
        }

        try {
          await addDoc(collection(db, "Newsletter"), {
            email,
            timestamp: Date.now(),
          });
    
          setEmail("");
          toast({
            title: "Success",
            description: "Subscribed successfully",
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
        <div className="border-b border-x-0 p-10 md:p-24 md:py-auto py-32">
            <div className="container mx-auto">
            <h1 className="text-3xl font-domine text-center">Subscribes to our Newsletter</h1>
             <p className="text-center mt-3">Stay updated with our latest collections and exclusive offers.</p>
            <div className="flex gap-2 mt-10 justify-center md:flex-row flex-col ">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="pr-4 p-1.5 border-black bg-transparent font-montserratSemiBold focus:outline-none border-b" placeholder="Email"/>
                <Button onClick={handleSubmit} className="!px-8 uppercase !text-sm p-2 bg-black text-white hover:bg-white hover:border hover:text-black hover:border-black font-montserratSemiBold">subscribe</Button>
            </div>
        </div>
        </div>
    )
}