import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import OurLocation from "../ContactUs/OurLocation";
import VideoBanner from "../components/VideoBanner"; 
import ContactCleopatra from "../ContactUs/ContactCleopatra";
import TimelessElegance from "../components/TimelessEleganceSection"

export default function ContactUs() {
  return (
    <div className="bg-white">
      <Header />
      <VideoBanner videoPath="/watch.mp4"/>
      <ContactCleopatra/>
      <OurLocation/>
      <TimelessElegance />
      <Newsletter/>
      <Footer />
    </div>
  );
}
