'use client'
import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';

function PlaceOrder() {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let orderItems: any[] = [];
        food_list.forEach((item: { _id: string | number; price: number }) => {
            if (cartItems[item._id] > 0) {
                const itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            const response = await axios.post(
                `${url}/api/order/place`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing your order. Please try again.");
        }
    };

    useEffect(() => {
        // Redirect to the cart page if no token or cart is empty
        if (!token || getTotalCartAmount() === 0) {
            window.location.replace('/Cart');
        }
    }, [token, getTotalCartAmount]);

    return (
        <div className="container-fluid bg-secondary text-black py-4">
            <form onSubmit={placeOrder} className='place-order h-screen flex items-center justify-between gap-[50px] mt-[20px] px-32'>
                <div className='place-order-left w-full max-w-[max(30%,500px)]'>
                    <p className='title text-[30px] font-[600] mb-[50px]'>Delivery Information</p>
                    <div className='multi-field'>
                        <input
                            required
                            name='firstName'
                            onChange={onChangeHandler}
                            value={data.firstName}
                            type='text'
                            placeholder='First Name'
                        />
                        <input
                            required
                            name='lastName'
                            onChange={onChangeHandler}
                            value={data.lastName}
                            type='text'
                            placeholder='Last Name'
                        />
                    </div>
                    <input
                        required
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type='email'
                        placeholder='Email Address'
                    />
                    <input
                        required
                        name='street'
                        onChange={onChangeHandler}
                        value={data.street}
                        type='text'
                        placeholder='Street'
                    />
                    <div className='multi-field'>
                        <input
                            required
                            name='city'
                            onChange={onChangeHandler}
                            value={data.city}
                            type='text'
                            placeholder='City'
                        />
                        <input
                            required
                            name='state'
                            onChange={onChangeHandler}
                            value={data.state}
                            type='text'
                            placeholder='State'
                        />
                    </div>
                    <div className='multi-field'>
                        <input
                            required
                            name='zipcode'
                            onChange={onChangeHandler}
                            value={data.zipcode}
                            type='text'
                            placeholder='Zipcode'
                        />
                        <input
                            required
                            name='country'
                            onChange={onChangeHandler}
                            value={data.country}
                            type='text'
                            placeholder='Country'
                        />
                    </div>
                    <input
                        required
                        name='phone'
                        onChange={onChangeHandler}
                        value={data.phone}
                        type='text'
                        placeholder='Phone'
                    />
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
                        <button
                            type="submit"
                            className='border-none text-white bg-[tomato] w-[max(100%,200px)] p-[12px 0px] rounded-[4px] mt-[30px]'
                        >
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;
