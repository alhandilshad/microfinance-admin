'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db} from "../utils/firebaseConfig";
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { doc, setDoc , getDoc} from "firebase/firestore"; 
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useAppContext } from '../context/Context';

const LoginPage = () => {
  const { currentUser } = useAppContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()


  useEffect(() => {
      if (currentUser) {
        router.push('/admin/Dashboard');
      }

  }, [currentUser]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!email ||!password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', { email: email, password: password });
      router.push('/admin/Dashboard');
    } catch (error) {
      console.log(error);
      
      if(error.code === 'auth/invalid-credential'){
        alert('Invalid email or password');
      }
    }
  }
  const provider = new GoogleAuthProvider();

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);  
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {  
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          userId: user.uid,
          isAdmin: true
        });
        console.log("User document created in Firestore.");
      } else {
        console.log("User document found:", docSnap.data());
      }

      router.push('/admin/Dashboard');    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <div className='container mx-auto'>
    <div className="flex flex-col md:flex-row w-full bg-white h-screen">
      
      <div className="w-full md:flex md:w-2/4 h-full relative justify-center hidden items-center">
        <Image src="/login.jpg" className="w-full h-auto" alt='login page image'fill/>
      </div>

<div className='md:w-2/4 h-full'>
      <div className="w-full md:w-2/4 mx-auto h-full flex flex-col justify-center items-center md:bg-white p-4">
        <div className='w-32 h-20 md:w-48 md:h-28 relative'>
        <Image src='/Cleopatra.png' className='' fill alt='logo'/>
        </div>


        <div className="rounded md:shadow-lg p-6 w-full">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">Login To Continue</h2>

          <div className="relative mb-4">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="email"
              className="w-full pl-10 py-2 border rounded focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 py-2 border rounded focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
            ) : (
              <EyeOff
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
            )}
          </div>

          <button className="w-full py-2 bg-[#36454F] text-white font-semibold rounded hover:bg-[#1e4846] transition" onClick={handleLogin}>
            <span className="flex items-center justify-center">
              → Login
            </span>
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

          {/* <p className="text-center mt-2 text-gray-500 text-sm cursor-pointer hover:underline">Don't have an account?<Link href='/Signup' className='text-[#1e4846]'> Signup now</Link></p> */}

        </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default LoginPage;
