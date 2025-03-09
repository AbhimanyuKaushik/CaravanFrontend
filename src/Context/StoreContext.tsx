'use client';
import { createContext, ReactNode, useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreContextProviderProps {
  children: ReactNode;
}

interface FoodItem {
  _id: string;
  name: string;
  image: string;
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


const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [food_list, setFoodList] = useState<FoodItem[]>([]);
  const [token, setToken] = useState<string>('');
  const url = "https://caravanbackend-c95x.onrender.com";

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
        if (error instanceof AxiosError) {
          console.error('Error adding to cart:', error.response?.data || error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
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
          if (error instanceof AxiosError) {
            console.error('Error adding to cart:', error.response?.data || error.message);
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = food_list.find(product => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
      return totalAmount;
    }, 0);
  };

  const fetchFoodList = useCallback(async (token: string) => {
    try {
      const response = await axios.get(
        url + "/api/food/list",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFoodList(response.data.data || []);
      console.log('Fetched food list:', response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error adding to cart:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }, [url]);

  const loadCartData = useCallback(async (token: string) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.cartData || {});
      console.log('Loaded cart data:', response.data.cartData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error adding to cart:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }, [url]);

  useEffect(() => {
    async function loadData() {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem("token") || '' : '';
      console.log('Stored token:', storedToken); // Debug line
      setToken(storedToken);
      if (storedToken) {
        await fetchFoodList(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, [fetchFoodList, loadCartData]);

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