'use client'
import { createContext, ReactNode, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import axios from 'axios';

interface FoodItem {
  _id: string;
  name: string;
  image: StaticImageData;
  price: number;
  description: string;
  category: string;
}

interface StoreContextType {
  food_list: FoodItem[];
  cartItems: Record<string, number>; // Object mapping item ids to quantities
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const url = "http://localhost:4000";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async(itemId: string) => {
    if (cartItems[itemId] && cartItems[itemId] > 0) {
      setCartItems(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
      if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {

        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

  const loadCartData = async (token: any)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  },[])

  const state: StoreContextType = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={state}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
