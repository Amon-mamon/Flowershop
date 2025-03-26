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
    <div className='flex flex-col'>
        <div className='flex justify-between bg-red-400 px-8'>
            <div className=''>
                <h2>Flower Shop</h2>
                <p className='max-w-xl'>Welcome to the world of Florist, where flowers come to life with love and creativity. Discover our story, our passion for flowers, and our commitment to making every moment memorable.</p>
            </div>
            <ul>
                <h3>Links</h3>
                {links.map((item,index)=>(
                    <li key={index}><Link href={""} >{item.title}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Contact Us</h3>
                <ul>
                
                    <li>Address: Xevera</li>
                    <li>Email:<Link href={""} >contact@info.com</Link></li>
                    <li>Phone:+639212477004</li>
                </ul>
            </div>
        </div>
        <div className='flex w-full justify-between px-8'>
            <p>Copyright © 2025 Flower Shop</p>
            <ul className='flex items-center gap-2'>
                <li><FaTwitter /></li>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaTiktok /></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer