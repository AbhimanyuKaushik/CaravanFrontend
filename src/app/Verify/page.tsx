'use client';
import { StoreContext } from "@/Context/StoreContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
    const [success, setSuccess] = useState<string | null>(null);
    const [orderID, setOrderID] = useState<string | null>(null);

    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('StoreContext must be used within a StoreContextProvider');
    }
    const { url } = context;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSuccess(params.get("success"));
        setOrderID(params.get("orderId"));
    }, []);

    useEffect(() => {
        const verifyPayment = async () => {
            if (success && orderID) {
                try {
                    const response = await axios.post(`${url}/api/order/verify`, { success, orderID });
                    if (response.data.success) {
                        window.location.href = "/myorders";
                    } else {
                        window.location.href = "/";
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    window.location.href = "/";
                }
            }
        };

        verifyPayment();
    }, [success, orderID, url]);

    return (
        <div className="verify min-h-[60vh] grid">
            <div className="spinner w-[100px] h-[100px] place-self-center border-[5px] border-solid border-[#bdbdbd] border-t-[tomato] rounded-[50%] animate-spin">
                {/* Loading spinner */}
            </div>
        </div>
    );
}

export default Page;
