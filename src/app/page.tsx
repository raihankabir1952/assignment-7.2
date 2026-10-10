import Image from "next/image";
import Footer from "./components/Footer";
import TodayPriceUp from "./components/TodayPriceUp";
import TodayPriceDown from "./components/TodayPriceDown";

export default function Home() {
  return (
    <div >
      <TodayPriceUp></TodayPriceUp>
      <TodayPriceDown></TodayPriceDown>

      <Footer></Footer>
      
    </div>
  );
}
