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
  cartItems: Record<string, number>;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: (token: string) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [food_list, setFoodList] = useState<FoodItem[]>([]);
  const [token, setToken] = useState<string>('');
  const url = "caravanbackend-production.up.railway.app";

  const addToCart = async (itemId: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (cartItems[itemId] && cartItems[itemId] > 0) {
      setCartItems(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
      if (token) {
        try {
          await axios.post(
            url + "/api/cart/remove",
            { itemId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error('Error removing from cart:', error.response?.data || error.message);
        }
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(product => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        url + "/api/food/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error.response?.data || error.message);
    }
  };

  const loadCartData = async (token: string) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token") || '';
      console.log('Stored token:', storedToken); // Debug line
      setToken(storedToken);
      if (storedToken) {
        await fetchFoodList();
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

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
