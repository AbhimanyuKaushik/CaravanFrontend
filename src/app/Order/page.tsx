'use client'
import React, { useState, useContext } from 'react';
import { StoreContext } from '@/Context/StoreContext';
import SabpaisaPaymentGateway from '../Compoennts/SabpaisaPaymentGateway';

function PlaceOrder() {
    const { getTotalCartAmount } = useContext(StoreContext);

    return (
        <div className="container-fluid bg-secondary text-black py-4">
            <form className='place-order h-screen flex items-center justify-between gap-[50px] mt-[20px] px-32' >
                <div className='place-order-left w-full max-w-[max(30%,500px)]'>
                    <p className='title text-[30px] font-[600] mb-[50px]'>Delivery Information</p>
                    <div className='multi-field'>
                        <input type='text' placeholder='First Name'  />
                        <input type='text' placeholder='Last Name' />
                    </div>
                    <input type='email' placeholder='Email Address'  />
                    <input type='text' placeholder='Street' />
                    <div className='multi-field'>
                        <input type='text' placeholder='City' />
                        <input type='text' placeholder='State' />
                    </div>
                    <div className='multi-field'>
                        <input type='text' placeholder='Zipcode' />
                        <input type='text' placeholder='Country' />
                    </div>
                    <input type='text' placeholder='Phone' />
                </div>
                <div className='place-order-right w-full max-w-[max(40%,500px)]'>
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
                                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <div className='hr'></div>
                            <div className='cart-total-details'>
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        <button type="submit" className='border-none text-white bg-[tomato] w-[max(100%,200px)] p-[12px 0px] rounded-[4px] mt-[30px]'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;
