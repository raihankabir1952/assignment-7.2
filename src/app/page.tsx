import Image from "next/image";
import Footer from "./components/Footer";
import TodayPriceUp from "./components/TodayPriceUp";
import TodayPriceDown from "./components/TodayPriceDown";
import AllProducts from "./components/AllProducts";

export default function Home() {
  return (
    <div >
      <TodayPriceUp></TodayPriceUp>
      <TodayPriceDown></TodayPriceDown>
      <AllProducts></AllProducts>
  
      
    </div>
  );
}
