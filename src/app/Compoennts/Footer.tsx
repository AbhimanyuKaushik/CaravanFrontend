'use client'
import Image from 'next/image'
import '../globals.css'
import React from 'react'
import { assets } from '../../../public/frontend_assets/assets'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
function Footer() {
    return (
        <div className='footer mt-[10px] text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] pt-[80px]' id='footer'>
            <div className='footer-content mt-10 w-full grid grid-cols-1 gap-[80px]'>
                <div className='footer-content-left flex flex-col items-start gap-[70px]'>
                    <div className='font-[Header] text-7xl mt-10 text-orange-600'>
                        Caravan
                    </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam iste est et amet architecto! Facere est magnam doloremque tempora ex neque fugiat mollitia ratione magni quo! Totam, repellat, culpa ullam consequatur, molestiae odio incidunt aspernatur dolore fuga laboriosam temporibus sunt quas rem! Iusto exercitationem, non laudantium illo dignissimos error totam.</p>
                    <div className='footer-social-icons flex flex-row gap-2'>
                        <InstagramIcon className='size-10' />
                        <FacebookIcon className='size-10' />
                        <TwitterIcon className='size-10' />
                    </div>
                </div>
                <div className='footer-content-center flex flex-col items-start mt-10 gap-[40px]'>
                    <h2 className='text-white text-2xl'>COMPANY</h2>
                    <ul className='flex flex-col gap-2'>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>About Us</li>
                        <li className='cursor-pointer'>Delivery</li>
                        <li className='cursor-pointer'>Privacy Policy</li>
                    </ul>
                    <div className='footer-content-right flex flex-col items-start mt-10 gap-[40px]'>
                        <h2 className='text-white text-2xl'>GET IN TOUCH</h2>
                        <ul>
                            <li className='cursor-pointer'>+91-8888443321</li>
                            <li className='cursor-pointer'>contact@caravan.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='hr w-full'>

            </div>
            <p className=''>Copyright 2024 @ Caravan.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
