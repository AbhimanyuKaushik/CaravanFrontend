'use client'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '@/Context/StoreContext';
import Image from 'next/image';

type LoginProps = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setShowLogin }) => {
    const handleClose = () => {
        setShowLogin(false);
    };

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error); 
            
            alert("An error occurred while processing your request.");
        }
    };

    return (
        <div className='login-popup absolute z-10 w-full h-full bg-[#00000090] grid'>
            <form onSubmit={onLogin} className="login-popup-container place-self-center text-[#808080] bg-white flex flex-col">
                <div className='login-popup-title flex justify-between items-center text-xl font-bold text-black'>
                    <h2>
                        {currState}
                    </h2>
                    <Image className='w-[16px] cursor-pointer' src='/cross_icon.png' width={500} height={500} onClick={handleClose} alt="Close"></Image>
                </div>
                <div className='login-popup-inputs flex flex-col gap-[20px]'>
                    {currState === 'Login' ? null : <input className='border-[2px] p-[10px] rounded-lg' name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />}
                    <input className='p-[10px] border-[2px] rounded-lg' name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                    <input className='p-[10px] border-[2px] rounded-lg' name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required />
                </div>
                <button type='submit' className='p-[10px] border-[2px] text-white bg-red-500 cursor-pointer text-[15px]'>{currState === "Sign Up" ? 'Create account' : 'Login'}</button>
                <div className='login-popup-condition flex items-start gap-[8px] mt-[-15px]'>
                    <input className='mt-[5px]' type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Login'
                    ? <p>Create a new account ? <span className='text-red-500 cursor-pointer' onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account ? <span className='text-red-500 cursor-pointer' onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default Login;
