'use client'
import Landing from "./Compoennts/Landing";
import Order from "./Compoennts/Order";
import './globals.css';
import ExploreMenu from "./Compoennts/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "./Compoennts/FoodDisplay";
import Footer from "./Compoennts/Footer";

export default function Home() {
  const [category, setCategory] = useState("Salad");

  return (
    <>
      <div className="flex flex-col w-[100%] m-auto">
        <Landing />
        <Order />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
      </div>
    </>
  );
}
