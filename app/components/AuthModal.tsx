import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
// import { useState } from "react";
import {auth} from "../../firebase"
import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false)
    if (!isOpen) return null;

const handleGoogle = async() => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log("User successfully logged in with their email:", user.email);
      onClose()
    }).catch((error) => {
      alert("ERROR" + error.code)
      // const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

const handleUser = () =>{
    // setIsModalOpen(true);
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
      <div className="bg-white p-10 rounded-md relative shadow-lg font-montserratSemiBold w-full font-montserratSemiBold max-w-md">
        <button className="absolute top-4 right-6" onClick={onClose}><X /></button>

        <h2 className="text-center text-2xl mb-10 mt-5">Log in to Confirm the order</h2>
        <button onClick={handleGoogle} className="p-2 h-14 w-full rounded-full mt-5 border flex items-center justify-center gap-5"><Image src="/google.webp" alt="google logo" width={40} height={40}/> Continue with Google</button>

      <Link href='/auth/login'>
        <button onClick={handleUser} className="p-2 h-14 w-full rounded-full mt-5 border flex items-center justify-center gap-5"><Image src="/email.png" alt="google logo" width={30} height={30}/> Continue with Email</button>
        </Link>
        <p className="text-gray-500 text-sm text-center mt-7 font-montserratMedium">By proceeding, you agree to our <Link href='/' className="underline">Terms of Use</Link> and confirm you have read our <Link href='/' className="underline">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
};

export default AuthModal;
