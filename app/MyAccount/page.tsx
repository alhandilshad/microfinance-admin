"use client"
import Header from "../components/Header"
import MyAccountBanner from "../components/myAccountBanner"
import MyAccountSidebar from "../components/MyAccountSidebar.js"
import Footer from "../components/Footer"
import Account  from "../components/Account";
import CardSlider from "../components/CardSlider"
import Login from '../auth/login/page'
import { useCart } from "../context/Context"

export default function Page() {
  const { user } = useCart();

  return (
    <div>
      <Header/>
      <MyAccountBanner/>
      {user ? (
      <div className="container flex md:flex-row flex-col justify-start md:gap-20 gap-5 mx-auto py-10 md:py-10">
        <div className="md:w-96 w-full p-4">
            <MyAccountSidebar/>
        </div>
        <div className="md:w-3/5 w-full mx-auto  p-4">
            <Account/>
            <div className="my-10">
              <h1  className="text-2xl md:text-3xl p-5 text-center font-domine">You may also like...</h1>
              <CardSlider/>
            </div>
        </div>
      </div>
      ): (
        <div>
          <Login/>
        </div>
      )}
      <Footer/>
    </div>
  )
}