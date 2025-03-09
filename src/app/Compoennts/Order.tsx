'use client'
import React from 'react';
import Image from 'next/image';
import '../globals.css'
import Gallery from './Gallery';


function Order() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <p className='order max-h-full max-w-full flex justify-center text-8xl px-1 md:text-8xl xl:text-9xl text-center'>
        Discover the best food & drinks.
      </p>
      <Gallery />
    </div>
  );
}

export default Order;
