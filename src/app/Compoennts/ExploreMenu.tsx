'use client'
import React from 'react';
import { menu_list } from '../../../public/frontend_assets/assets';
import Image from 'next/image';
import '../globals.css';

interface ExploreMenuProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
    return (
        <div id='explore-menu' className='explore flex flex-col h-96 gap-[50px] w-full px-32'>
            <h1 className='text-4xl text-[#262626] font-sans font-semibold'>Explore our menu</h1>
            <p className='menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className='flex justify-between items-center gap-[30px] text-center'>
                {menu_list.map((item, index) => {
                    return (
                        <div 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                            className='menu cursor-pointer' 
                            key={index}
                        >
                            <Image className={`${category === item.menu_name ? "active" : ""} menu-items-image`} src={item.menu_image} alt={item.menu_name} />
                            <p className='mt-[10px] text-[#747474] cursor-pointer'>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <div className='hr'>
                .
            </div>
        </div>
    );
}

export default ExploreMenu;
