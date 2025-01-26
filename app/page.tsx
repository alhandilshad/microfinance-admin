"use client"

import Header from "./components/Header";
import Footer from "./components/Footer";
// import Banners from "./components/Banners";
import Newsletter from "./components/Newsletter";
import WatchSlider from "./components/WatchSlider";
import VideoBanner from "./components/VideoBanner";
// import Popularbrands from "./components/Popularbrands";
import LuxuryShowcase from "./components/LuxuryShowcase";
import SpecialAddition from "./components/SpecialAddition";
// import ShoppingBenefits from "./components/ShoppingBenefits";
import TimelessElegance from "./components/TimelessEleganceSection"
import MarketplaceforLuxuryWatches from "./components/MarketplaceforLuxuryWatches";
// import { useCart } from "./context/Context";
import TrustedSaler from "./components/TrustedSeller"
import DiscoverNow from "./components/DiscoverNow"

export default function Home() {
  // const {cart} = useCart();
  return (
    <div className="bg-white">
      <Header />
      <VideoBanner videoPath="/videoplayback.mp4"/>
      <DiscoverNow/>
      {/* <Popularbrands/> */}
      {/* <Banners image='/Banners.avif' title='Writing & Stationery' description='Continuing a tradition from the first pens to the latest stationery editions, the joy of writing is expressed in Cartier’s writing instruments and finely crafted stationery. Weave beauty into every handwritten note.'/> */}
      <SpecialAddition />
      <TrustedSaler/>
      <LuxuryShowcase />
      <MarketplaceforLuxuryWatches/>
      <WatchSlider />
      <TimelessElegance />
      {/* <ShoppingBenefits /> */}
      <Newsletter/>
      <Footer />
    </div>
  );
}