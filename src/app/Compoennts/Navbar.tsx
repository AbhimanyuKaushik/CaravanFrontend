'use client'
import React, { useContext } from 'react';
import { assets } from '../../../public/frontend_assets/assets';
import '../globals.css';
import NextLink from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { StoreContext } from '@/Context/StoreContext';
import { useState } from 'react';
import Login from './Login';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
    const [menu, setMenu] = useState('home');
    const [showLogin, setShowLogin] = useState(false);
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    
    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        window.location.href = '/';
    }
    const handleSignInClick = () => {
        setShowLogin(true);
    };

    return (
        <>
            {showLogin && <Login setShowLogin={setShowLogin} />}
            <div className='navbar bg-white px-10 flex justify-between items-center'>
                <p className='logo font-semibold cursor-pointer text-3xl ml-40'>LOGO</p>
                <ul className='navbar-menu items-center flex flex-row list-none gap-[60px] text-[tomato] font-medium text-[30px]'>
                    <NextLink href='/'>
                        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
                    </NextLink>
                    <ScrollLink to='explore-menu' smooth={true} duration={500}>
                        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
                    </ScrollLink>
                    <ScrollLink to='app-download'>
                        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
                    </ScrollLink>
                    <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
                </ul>
                <div className='navbar-right flex items-center gap-[40px]'>
                    <div className='search'>
                        <NextLink href='/Cart'>
                            <ShoppingBagIcon fontSize='large' className='text-[tomato] mb-2 cursor-pointer' />
                            <div className={getTotalCartAmount() > 0 ? "dot absolute w-[10px] h-[10px] bg-[tomato] rounded-full top-[6px] right-[175px]" : ""}></div>
                        </NextLink>
                    </div>
                    {!token ? <button className="btny" onClick={handleSignInClick}>sign in</button>
                        : <div className='navbar-profile relative'>
                            <PersonIcon className='mb-1 cursor-pointer' fontSize='large' sx={{ color: 'tomato' }}/>
                            <ul className='nav-profile-dropdown'>
                                <li><Image src={assets.bag_icon} alt=''/><p>Orders</p></li>
                                <hr/>
                                <li onClick={logout}><Image src={assets.logout_icon} alt=''/><p>Logout</p></li>
                            </ul>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Navbar;
