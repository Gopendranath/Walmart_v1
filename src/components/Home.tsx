import React from "react";
import Features from "./Features";
// import { Products } from "@/constants/grid";
// import { ProductCard } from "./ProductCard";
import ProductList from "./ProductList";
import { HomeGrid, MobileHomeGrid, View2Grid, View2MobileGrid } from "./Homegrid";
import CategorySection from "./Category";


const Home = () => {
  const [isMobile, setIsMobile] = React.useState(false);


  React.useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);


  return (
    <section>
      {isMobile ? <MobileHomeGrid /> : <HomeGrid />}
      <ProductList />
      <CategorySection/>
      {isMobile ? <View2Grid/> : <View2MobileGrid/>}
      <ProductList />
      <ProductList />
      <div className="border-t border-border"></div>
      <Features />
    </section>
  );
};

export default Home;
