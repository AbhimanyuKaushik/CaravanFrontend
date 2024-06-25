'use client'
import React, { useState, useContext } from 'react';
import { StoreContext } from '@/Context/StoreContext';
import SabpaisaPaymentGateway from '../Compoennts/SabpaisaPaymentGateway';

function PlaceOrder() {
    const { getTotalCartAmount } = useContext(StoreContext);

    const [isOpen, setIsOpen] = useState(false);
    const [clientCode, setClientCode] = useState("LPSD1");
    const [transUserName, setTransUserName] = useState("Abh789@sp");
    const [transUserPassword, setTransUserPassword] = useState("P8c3WQ7ei");
    const [authkey, setAuthkey] = useState("kaY9AIhuJZNvKGp2");
    const [authiv, setAuthiv] = useState("YN2v8qQcU3rGfA1y");
    const [payerName, setPayerName] = useState("Anand Kumar Shaw");
    const [payerEmail, setPayerEmail] = useState("anand.kumar@sabpaisa.in");
    const [payerMobile, setPayerMobile] = useState("6291312929");
    const [clientTxnId, setClientTxnId] = useState("38289722933377snjn");
    const [amount, setAmount] = useState(8625);
    const [payerAddress, setPayerAddress] = useState("Kolkata");
    const [callbackUrl, setCallbackUrl] = useState("http://localhost:4000/response");
    const [data, setData] = useState(null);
    const [udf1, setUdf1] = useState(null);
    const [udf2, setUdf2] = useState(null);
    const [udf3, setUdf3] = useState(null);
    const [channelId, setChannelId] = useState(null);
    const [programId, setProgramId] = useState(null);
    const [mcc, setMcc] = useState(null);
    const [amountType, setAmountType] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return (
        <div className="container-fluid bg-secondary text-black py-4">
            <form className='place-order h-screen flex items-center justify-between gap-[50px] mt-[50px] px-32' onSubmit={handleSubmit}>
                <div className='place-order-left w-full max-w-[max(30%,500px)]'>
                    <p className='title text-[30px] font-[600] mb-[50px]'>Delivery Information</p>
                    <div className='multi-field'>
                        <input type='text' placeholder='First Name' value={payerName} onChange={(e) => setPayerName(e.target.value)} />
                        <input type='text' placeholder='Last Name' />
                    </div>
                    <input type='email' placeholder='Email Address' value={payerEmail} onChange={(e) => setPayerEmail(e.target.value)} />
                    <input type='text' placeholder='Street' value={payerAddress} onChange={(e) => setPayerAddress(e.target.value)} />
                    <div className='multi-field'>
                        <input type='text' placeholder='City' />
                        <input type='text' placeholder='State' />
                    </div>
                    <div className='multi-field'>
                        <input type='text' placeholder='Zipcode' />
                        <input type='text' placeholder='Country' />
                    </div>
                    <input type='text' placeholder='Phone' value={payerMobile} onChange={(e) => setPayerMobile(e.target.value)} />
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
            <SabpaisaPaymentGateway
                clientCode={clientCode}
                transUserName={transUserName}
                transUserPassword={transUserPassword}
                authkey={authkey}
                authiv={authiv}
                payerName={payerName}
                payerEmail={payerEmail}
                payerMobile={payerMobile}
                clientTxnId={clientTxnId}
                amount={amount}
                payerAddress={payerAddress}
                callbackUrl={callbackUrl}
                isOpen={isOpen}
                data={data}
                udf1={udf1}
                udf2={udf2}
                udf3={udf3}
                channelId={channelId}
                programId={programId}
                mcc={mcc}
                amountType={amountType}
            />
        </div>
    );
}

export default PlaceOrder;
