"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { User, Lock, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc , getDoc} from "firebase/firestore";
import Image from "next/image";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/Dashboard");
      }
    });
    return () => unsubscribe();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        const userData = { name, email, uid };
        await setDoc(doc(db, "users", uid), userData);
        router.push("/admin/Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });
  };

   const provider = new GoogleAuthProvider();

     const handleGoogle = async () => {
    try{
     let result = await signInWithPopup(auth, provider)
     const user = result.user;

     const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid),{
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid,
        isAdmin: true,
      })
      console.log("User document created in Firestore.");
      
    } else {
      console.log("User document found:", docSnap.data());
    }

     router.push('/admin/Dashboard');
    }
    catch(error){
      alert("ERROR--->" + error.code);
    }
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">

      <div className="w-full md:flex md:w-2/4 hidden relative justify-center items-center">
        <Image src="/login.jpg" fill alt="login page"/>
      </div>

      <div className="w-full md:w-2/4 flex flex-col justify-center h-full items-center">

      <div className="w-32 h-20 md:w-48 md:h-28 relative">
        <Image src="/Cleopatra.png" fill alt="Logo"/>
      </div>

        <div className="w-full md:w-2/4 flex flex-col justify-center md:bg-white rounded md:shadow-md p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
            Sign Up
          </h2>

          <div className="relative mb-4">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 py-2 border rounded text-sm focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative mb-4">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Email"
              className="w-full pl-10 py-2 border rounded text-sm focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 py-2 border rounded text-sm focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>

          <button
            className="w-full py-2 bg-[#36454F] text-white font-semibold rounded text-sm hover:bg-[#1e4846] transition"
            onClick={handleSignUp}
          >
            <span className="flex items-center justify-center">→ Sign up</span>
          </button>

          <div className='relative w-full mt-4'>
          <div className="absolute inset-0 flex items-center">
                    {/* <div className="w-full border-t border-gray-400" /> */}
                </div>
                {/* <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white">or</span>
            </div> */}
        </div>
          {/* <button onClick={handleGoogle} className="p-2 h-14 w-full rounded-md mt-5 border flex items-center justify-center gap-5"><Image src="/Google_Icons.webp" alt="google logo" width={40} height={40}/> Continue with Google</button>  */}
          <p className="text-center mt-2 text-gray-500 text-xs md:text-sm cursor-pointer hover:underline">Already have an account? <Link href="/Login" className="text-[#1e4846]">Login now</Link></p>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
