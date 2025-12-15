'use client'
import React, { useContext } from 'react';
import { StoreContext } from '@/Context/StoreContext';
import Fooditem from './Fooditem';
import '../globals.css'
interface FoodDisplayProps {
  category: string;
}

function FoodDisplay({ category }: FoodDisplayProps) {
  const context = useContext(StoreContext);

  if (!context) {

    return null;
  }

  const { food_list } = context;

  return (
    <div className=' px-32' id='food-display'>
      <div className='menu-display grid py-20 grid-cols-4 mt-[30px] gap-[30px] gap-y-[50px]'>
        {food_list.map((item) => {
          if (category === 'All' || category === item.category) {
            return (
              <Fooditem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
