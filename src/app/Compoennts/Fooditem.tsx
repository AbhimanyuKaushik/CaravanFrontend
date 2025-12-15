import React, { memo, useContext } from 'react';
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
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('StoreContext must be used within a StoreContextProvider');
    }

    const { url, cartItems, addToCart, removeFromCart } = context;

    return (
        <div className="food-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-64 flex-shrink-0">
            {/* Image Container */}
            <div className="relative h-48 w-full">
                <Image
                    className="object-cover w-full h-full"
                    src={url + "/images/" + image}
                    alt={name}
                    width={300}
                    height={200}
                    priority
                />
                {/* Add/Remove Cart Buttons */}
                {!cartItems[id] ? (
                    <Image
                        className="w-8 h-8 cursor-pointer absolute bottom-4 right-4 rounded-full"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add icon"
                    />
                ) : (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 p-2 rounded-full bg-white">
                        <Image
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove icon"
                        />
                        <p>{cartItems[id]}</p>
                        <Image
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add icon"
                        />
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-lg">{name}</p>
                    <Image
                        className="w-16"
                        src={assets.rating_starts}
                        alt="Rating stars"
                    />
                </div>
                <p className="text-gray-600 text-sm mb-2">{description}</p>
                <p className="text-yellow-500 font-semibold">${price}</p>
            </div>
        </div>
    );
});

Fooditem.displayName = 'Fooditem';
export default Fooditem;