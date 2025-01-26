"use client"
import Link from "next/link"
import Image from "next/image";
import { useState } from "react"
import {auth} from "../../../firebase"
// import {collection, getDocs} from "firebase/firestore";
import { signInWithEmailAndPassword  ,GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
const provider = new GoogleAuthProvider();

const Page = () => {
  const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleLogin = async () =>{
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
      })
        return;
    }

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    location.href = "/orderConfirmation"; 
})
.then(() => {
  setEmail("")
  setPassword("")
  // setIsModalOpen(false);
})
  .catch((error) => {
    alert("ERROR: " + error.message); 
});
}


const handleGoogle = async() => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log("User successfully logged in with their email:", user.email);
    }).catch((error) => {
      alert("ERROR" + error.code)
      // const credential = GoogleAuthProvider.credentialFromError(error);
  });
}


return (
<div className="flex flex-col justify-center items-center h-screen p-5">
            <div className="bg-white md:p-10 p-5 rounded-md border w-full font-montserratSemiBold max-w-md">

                <h2 className="text-xl font-bold my-3 text-center">Login</h2>

                <label className="mt-5 block">Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email.." className="p-4 mt-1 font-montserratMedium pl-0 border-b block w-full"/>    
                </label>
                <label className="mt-5 block">Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password.." className="p-2 mt-1 font-montserratMedium pl-0 border-b block w-full"/>    
                </label>

                <button className="bg-black text-white w-full rounded-md p-2 mt-5" onClick={handleLogin}>Login</button>
                <p className="mt-5 text-center text-gray-500 font-montserratMedium">Don&apos;t have an account? <Link href='/auth/signup' className="font-montserratSemiBold text-black">Signup</Link></p>

                <div className='relative w-full mt-4'>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-400" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white">or</span>
                    </div>
                </div>

                <button onClick={handleGoogle} className="p-2 h-14 w-full rounded-md mt-5 border flex items-center justify-center gap-5"><Image src="/google.webp" alt="google logo" width={40} height={40}/> Continue with Google</button>
            </div>
</div>
)
}

export default Page
