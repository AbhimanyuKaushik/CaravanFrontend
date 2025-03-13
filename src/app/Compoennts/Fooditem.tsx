import React, { memo, useContext, useState } from 'react';
import Image from 'next/image';
import { assets } from '../../../public/frontend_assets/assets';
import '../globals.css';
import { StoreContext } from '@/Context/StoreContext';

interface FooditemProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const Fooditem = memo(({ id, name, price, description, image }: FooditemProps) => {
    const [itemCount, setItemCount] = useState(0);
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('StoreContext must be used within a StoreContextProvider');
    }

    const { url, cartItems, addToCart, removeFromCart } = context;

    const increaseItemCount = () => {
        setItemCount(prevCount => prevCount + 1);
    };

    return (
        <div className='food-item'>
            <div className='relative'>
                <Image
                    className='food-item-image object-contain w-full h-full'
                    src={url + "/images/" + image}
                    alt={name}
                    width={800}
                    height={500}
                    priority
                />
                {!cartItems[id] ? (
                    <Image
                        className='w-[35px] cursor-pointer absolute bottom-[15px] right-[15px] rounded-[50%]'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt='Add icon'
                    />
                ) : (
                    <div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white'>
                        <Image
                            className='w-[30px] cursor-pointer'
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt='Remove icon'
                        />
                        <p>{cartItems[id]}</p>
                        <Image
                            className='w-[30px] cursor-pointer'
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt='Add icon'
                        />
                    </div>
                )}
            </div>
            <div className='p-[20px]'>
                <div className='flex justify-between items-center mb-[10px]'>
                    <p className='item-name'>{name}</p>
                    <Image
                        className='w-[70px]'
                        src={assets.rating_starts}
                        alt='Rating stars'
                    />
                </div>
                <p className='text-[#676767] text-[12px]'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
});

Fooditem.displayName = 'Fooditem'; // Add this line

export default Fooditem;