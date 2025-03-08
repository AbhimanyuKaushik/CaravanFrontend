'use client'
import React, { useContext } from 'react'
import '../globals.css'
import { StoreContext } from '@/Context/StoreContext'
import Image from 'next/image'
import Link from 'next/link'

function CartPage() {
  const { url,cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)


  return (
    <div className='cart h-screen mx-48 mt-[200px]'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <div className='hr'>
        </div>
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <Image
                    className='w-[50px]'
                    src={url+"/images/"+item.image}
                    alt=''
                    width={1000}
                    height={200}
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross cursor-pointer'>x</p>
                </div>
                <div className='hr'></div>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom mt-[80px] flex justify-between gap-[max(12vw,20px)]'>
        <div className='cart-total flex-1 flex flex-col gap-[20px]'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className='hr'></div>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className='hr'></div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <Link
            href='/Order'
          >
            <button className='border-none text-white bg-[tomato] w-[max(100%,200px)] p-[12px 0px] rounded-[4px]'>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
        <div className='cart-promocode flex-1'>
          <div>
            <p className='text-[#555]'>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px]'>
              <input className='bg-transparent border-none outline-none pl-[10px]' type='text' placeholder='promo code' />
              <button className='w-[max(10vw,150px)] p-[12px 5px] bg-black border-none text-white rounded-[4px]'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage