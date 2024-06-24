'use client'
import React, { useContext, useState } from 'react';
import '../globals.css';
import Sidebar from './Sidebar';
import { PlaceholdersAndVanishInputDemo } from './Searchbar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Login from './Login';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '../../../public/frontend_assets/assets';
import { StoreContext } from '@/Context/StoreContext';

function Landing() {

    return (
        <>
            
            <div className='banner w-full h-[680px] md:min-h-screen xl:min-h-screen flex flex-col p-4 pt-6'>
                <div className='w-full h-full flex flex-col items-center'>
                    <p className='header text-white text-9xl md:text-[20rem] md:mt-64 xl:mt-40 mt-80 w-full text-center'>
                        Caravan
                    </p>
                </div>
                <PlaceholdersAndVanishInputDemo />
            </div>
        </>
    );
}

export default Landing;
