'use client'
import React from 'react'
import '../globals.css'
import Image from 'next/image'
import { assets } from '../../../public/frontend_assets/assets'
function AppDownload() {
  return (
    <div className='app-download flex flex-col gap-12 items-center m-auto mt-[100px] text-[max(3vw,20px)]' id='app-download'>
      <p>For Better Experience Download</p>
      <p>Caravan App</p>
      <div className='platforms flex justify-center gap-[max(2vw,10px)] mt-[40px]]'>
        <Image className='transition-[0.5s] cursor-pointer' src={assets.play_store} alt=''/>
        <Image className='transition-[0.5s] cursor-pointer' src={assets.app_store} alt=''/>
      </div>
    </div>
  )
}

export default AppDownload
