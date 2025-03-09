// Import necessary modules and assets
import React, { memo, useContext, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { assets } from '../../../public/frontend_assets/assets'; // Adjust the path based on your project structure
import '../globals.css'; // Assuming global styles are defined here
import { StoreContext } from '@/Context/StoreContext'; // Adjust the context import path as per your project structure

// Define props interface for Fooditem component
interface FooditemProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string; // Assuming image is a string representing the image path
}

// Functional component for rendering a food item
const Fooditem = memo(({ id, name, price, description, image }: FooditemProps) => {
    const [itemCount, setItemCount] = useState(0); // Local state for managing item count if needed
    const context = useContext(StoreContext);

    // Check if context is defined
    if (!context) {
        throw new Error('StoreContext must be used within a StoreContextProvider');
    }
    const { url, cartItems, addToCart, removeFromCart } = context; // Accessing context values

    // Function to increase item count locally if needed
    const increaseItemCount = () => {
        setItemCount(prevCount => prevCount + 1);
    };

    // Render JSX for food item component
    return (
        <div className='food-item'>
            <div className='relative'>
                <Image
                    className='food-item-image object-contain w-full h-full'
                    src={url + "/images/" + image}
                    alt={name} // Alt text for accessibility
                    width={800}
                    height={500}
                    priority
                />
                {!cartItems[id] ? (
                    // Display add icon if item not in cart
                    <Image
                        className='w-[35px] cursor-pointer absolute bottom-[15px] right-[15px] rounded-[50%]'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt='Add icon'
                    />
                ) : (
                    // Display item count and controls if item in cart
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

export default Fooditem; // Export Fooditem component
