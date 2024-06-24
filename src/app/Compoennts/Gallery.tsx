'use client'
import Image from 'next/image'
import '../globals.css'
import React from 'react'

function Gallery() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='grid grid-cols-10 grid-rows-5 gap-4 h-full w-full p-10 px-40'>
        <div className='col-span-4 row-span-4 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <video
            src='https://videos.pexels.com/video-files/11571662/11571662-sd_360_640_25fps.mp4'
            autoPlay
            loop
            className='object-cover rounded-3xl w-full h-full'
          >

          </video>
        </div>
        <div className='col-span-2 row-span-2 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <Image className='object-cover rounded-3xl w-full h-full' src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D' width={200} height={400} alt='' />
        </div>
        <div className='col-span-2 row-span-1 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <Image className='object-cover rounded-3xl w-full h-full' src='https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D' width={200} height={400} alt='' />
        </div>
        <div className='col-span-2 row-span-1 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <Image className='object-cover rounded-3xl w-full h-full' src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D' width={200} height={400} alt='' />
        </div>
        <div className='col-span-4 row-span-3 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <video
            src='https://videos.pexels.com/video-files/7015436/7015436-sd_360_640_25fps.mp4'
            autoPlay
            loop
            className='object-cover rounded-3xl w-full h-full'
          >

          </video>
        </div>
        <div className='col-span-2 row-span-2 rounded-3xl flex justify-center items-center bg-indigo-300'>
          <Image className='object-cover rounded-3xl w-full h-full' src='https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D' width={200} height={400} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Gallery
