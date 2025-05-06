"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { GiFlowers } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import icons from '@/constants/icons';



const NavBar =  () => {
    const {data:session, status} = useSession()
    const [scrolling, setScrolling] = useState(false)
    const [toggleMenu, settoggleMenu] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // colors
    const navTextColor = scrolling ? "text-white" : "text-gray-200"
    const iconColor = scrolling ? "text-white" : "text-gray-200";
    const navBg = scrolling ? "bg-[#EA454C]" : "bg-black";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);
      
   useEffect (() =>{
    const handleScroll = () => {
        setScrolling (window.scrollY > 50)
    }
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
   },[])
    
   useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 650) { 
            settoggleMenu(false);
        }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <nav className={`w-full sticky top-0 left-0 z-20  ${navBg} transition-all`}>
       <div className='w-full flex justify-between py-3 px-4 md:px-8 items-center relative'>
            <div className='w-full flex items-center gap-1 cursor-pointer'>
                    <GiFlowers className={`${scrolling ? "text-white text-3xl lg:text-5xl": "text-3xl lg:text-5xl  text-red-400"} `} />
                    <h1 className={`${scrolling ? "text-white text-3xl lg:text-5xl font-bold cormorant": " cormorant font-bold text-3xl lg:text-5xl text-red-400"} `}>JVB</h1>
            </div>
            <ul className={`w-full h-full text-center md:flex ${!toggleMenu ? "hidden md:flex " : "absolute top-15 w-full bg-[#EA454C] border-t-1 border-white right-0 px-2 "}`}>
                    <li className={`w-full md:flex cursor-pointer text-white text-md lg:text-lg capitalize gap-12` }>
                        <Link href={"/"} className={` text-sm lg:text-lg ${navTextColor}`}>Home</Link>
                        <Link href={"about"} className={` text-sm lg:text-lg ${navTextColor}`}>About</Link>
                        <Link href={"shop"} className={` text-sm lg:text-lg ${navTextColor}`}>Shop</Link>
                        <Link href={""} className={` text-sm lg:text-lg ${navTextColor}`}>Contact</Link>
                    </li>
                {session && toggleMenu ?  (
                    <button onClick={() => signOut()} className='text-white  cursor-pointer'>
                        Logout
                    </button>
                ) : (
                     <div className=' md:hidden'>
                         <Link href="/auth/register" className={`${navTextColor} cursor-pointer transition-all rounded-md `}>Sign up</Link>
                         <Link href="/auth/login" className={`${navTextColor} cursor-pointer transition-all rounded-md `}>Sign in</Link>
                     </div>
                    
                )}  
            </ul>
            {/* session if logged in, navbar will have icon for logout */}
            <div className='flex items-center gap-2 justify-end w-3/4'>
               {status === "loading" ? null :(
                session ? (
                    <div className='flex items-center gap-2'>
                        <div className={` transition-all ${scrolling ? "bg-white  p-1 md:p-2 rounded-3xl hover:bg-gray-300 cursor-pointer text-gray-500 hover:text-gray-700" :" bg-red-400 rounded-3xl p-1 md:p-2 text-white hover:bg-gray-400 hover:text-white cursor-pointer"}`}>
                            <icons.LuShoppingCart className='text-lg md:text-xl'/>
                        </div>
                        <div ref={dropdownRef}>
                            <div
                                onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2
                                  cursor-pointer'>
                                    <span className={`hidden md:block font-semibold text-white`}>{session.user?.username|| ""}</  span>
                                    {isOpen && (
                                        <button onClick={() => signOut()} className=' w-26 hover:bg-gray-400 hover:text-white top-14 bg-white cursor-pointer absolute right-6  px-3 py-1 rounded-md'>
                                            Logout
                                         </button>
                                    )}  
                            </div>
                        </div>
                    </div>
                ) : <div className='gap-1 hidden md:flex'>
                        <Link href="/auth/login" className='text-[#EA454C] hover:text-white hover:bg-red-400 transition-all   bg-white py-2 rounded-md px-2 lg:px-3 text-sm lg:text-base btn-scale active:bg-red-500'>Sign in</Link>
                        <Link href="/auth/register" className='hover:text-[#EA454C] hover:bg-white text-white bg-red-400 transition-all    py-2 rounded-md px-2 lg:px-3 text-sm lg:text-base btn-scale active:bg-white'>Sign up</Link>
                    </div>
                )}
            </div>
            <button 
            onClick={()=> settoggleMenu(!toggleMenu)}
            className='cursor-pointer block lg:hidden'>    
            {toggleMenu ? (
                <IoCloseSharp className={`text-3xl block md:hidden ${iconColor} `} />
            ) : (
                    <RxHamburgerMenu className={`${scrolling ? "text-white text-3xl": "text-3xl block md:hidden text-red-400"} `} />
                )
            }
            </button>
       </div>
       
    </nav>
  )
}
export default NavBar