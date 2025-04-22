"use client"
import React from 'react'
import Link from 'next/link';
import { FaTiktok, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


interface Link {
    title:string;
}
const Footer = () => {

    const links:Link[] = [
        {
        title:"home"
        },
        {
        title:"about"
        },
        {
        title:"shop"
        },
        {
        title:"contact"
        },
    ]
  return (
    <div className=' flex flex-col px-4 gap-12'>
        <div className='lg:flex justify-between px-8 border-b border-red-400'>
            <div className='mb-12 lg:mb-2'>
                <h2 className='cormorant font-bold text-3xl'>Flower Shop</h2>
                <p className='max-w-xl cormorant font-bold text-xl'>Welcome to the world of Florist, where flowers come to life with love and creativity. Discover our story, our passion for flowers, and our commitment to making every moment memorable.</p>
            </div>
            <ul className='mb-12 lg:mb-2'>
                <h3 className='text-xl font-bold mb-3'>Links</h3>
                {links.map((item,index)=>(
                    <li key={index}><Link href={""} className='text-blue-600  hover:text-blue-900 capitalize'>{item.title}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <h3 className='text-xl font-bold mb-3'>Contact Us</h3>
                <ul>
                    <li>Address: Xevera</li>
                    <li>Email:<Link href={""} className='text-blue-500 hover:text-blue-950 transition-all'>contact@info.com</Link></li>
                    <li>Phone:+639212477004</li>
                </ul>
            </div>
        </div>
        <div className=' md:flex w-full justify-between px-8'>
            <p className='mb-12 lg:mb-2'>Copyright © 2025 Flower Shop</p>
            <ul className='flex items-center gap-3'>
                <li className='text-xl bg-red-800/80 p-2 rounded-3xl text-white hover:bg-red-400'><Link href={""}><FaTwitter /></Link></li>
                <li className='text-xl bg-red-800/80 p-2 rounded-3xl text-white hover:bg-red-400'><Link href={""}><FaFacebook /></Link></li>
                <li className='text-xl bg-red-800/80 p-2 rounded-3xl text-white hover:bg-red-400'><Link href={""}><FaInstagram /></Link></li>
                <li className='text-xl bg-red-800/80 p-2 rounded-3xl text-white hover:bg-red-400'><Link href={""}><FaTiktok /></Link></li>
            </ul>
        </div>
    </div>
  )
}
export default Footer