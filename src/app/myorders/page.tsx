'use client';
import { StoreContext } from '@/Context/StoreContext';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { assets } from '../../../public/frontend_assets/assets';

function Page() {
  const context = useContext(StoreContext);

  // Check if context is defined
  if (!context) {
    throw new Error('StoreContext must be used within a StoreContextProvider');
  }

  const { url, token } = context;
  const [data, setData] = useState<any[]>([]); // Use `any` for flexibility or define an appropriate type.

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('API Response:', response.data);
      setData(response.data.data || []);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error adding to cart:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }, [token, url]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  return (
    <div className='my-orders m-[50px]'>
      <h2>My Orders</h2>
      <div className='container flex flex-col gap-[20px] mt-[30px]'>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div
              key={index}
              className='my-orders-order grid grid-flow-col items-center gap-[30px] text-[14px] text-[#454545] border-[1px] border-solid border-[tomato]'
            >
              <Image src={assets.parcel_icon} alt='Parcel_icon' width={60} height={60} />
              <p>
                {order.items
                  .map((item: { name: string; quantity: string; }) => `${item.name}x${item.quantity}`)
                  .join(', ')}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span className='text-[tomato]'>&#x25cf;</span>
                <b className='text-[500] text-[#454545]'>{order.status}</b>
              </p>
              <button onClick={fetchOrders} className='border-none border-[4px] p-[12px] bg-[#ffe1e1] text-[#454545]'>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;