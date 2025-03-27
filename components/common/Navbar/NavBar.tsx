"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
// import { LuShoppingCart } from "react-icons/lu";
import { GiFlowers } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";



const NavBar = () => {
    const [scrolling, setScrolling] = useState(false)
    const sections = ["home","about","shop", "contact"]
    const [toggleMenu, settoggleMenu] = useState(false)

   useEffect (() =>{

    const handleScroll = () => {
        setScrolling (window.scrollY > 50)
    }
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
   },[])
  return (
    <nav className={`w-full fixed top-0 left-0 z-20 ${scrolling ? "bg-[#EA454C]/100" : "bg-[#EA454C]/0"} transition-all`}>
       <div className='w-full flex justify-between py-3 px-4 md:px-8 items-center relative'>
            <div className='flex items-center gap-1 cursor-pointer'>
                    <GiFlowers className='text-white text-5xl' />
                    <h1 className='text-white font-bold text-4xl'>JVB</h1>
            </div>
            <ul className={`${!toggleMenu ? "hidden md:flex gap-10" :"absolute top-18 w-full bg-[#EA454C] border-t-1 border-white right-0 px-2 "}`}>
                {sections.map((item,index)=>(
                    <li  key={index}  className={` cursor-pointer text-white text-lg capitalize`}>
                        <Link href={''}>{item}</Link>
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-2'>
                {/* <div>
                        <LuShoppingCart />
                </div> */}
                <div className='gap-1 hidden md:flex'>
                    <Link href="" className='text-[#EA454C] hover:text-white hover:bg-red-400 transition-all   bg-white py-2 rounded-md px-3'>Sign in</Link>
                    <Link href="" className='hover:text-[#EA454C] hover:bg-white text-white bg-red-400 transition-all    py-2 rounded-md px-3'>Sign up</Link>
                </div>
            </div>
            <button 
            onClick={()=> settoggleMenu(!toggleMenu)}
            className='cursor-pointer block md:hidden'>    
            {toggleMenu ? (
                <IoCloseSharp className='text-white text-3xl block md:hidden' />
            ) : (
                    <RxHamburgerMenu className='text-white text-3xl block md:hidden' />
                )
            }
            </button>
       </div>
       
    </nav>
  )
}
export default NavBar