"use client"
import Aside from '../../reusable/aside';
import Link from 'next/link'
import React, { useState } from 'react'
import SendCode from './modal/SendCode';
import TogglePassword from '@/components/reusable/TogglePassword';


const RegisterForm = () => {
const [isVisible, setIsVisible] = useState(false)
const [openVerification, setVerification] = useState(false) 
  return (
    <form action="" className='flex '>
        <Aside/>
        <div className='gap-2 flex flex-col w-full items-center justify-center'>
            <h1 className='text-4xl font-bold'>Create Account</h1>
                <div className='xl:flex w-3/4 gap-2'>
                    <div className='flex  flex-col w-full'>
                        <label htmlFor="">First Name</label>
                        <input 
                        maxLength={255}
                        type="text" 
                        className='p-4 border border-[#DADADA] rounded-md' placeholder='Enter your First Name'/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Last Name</label>
                        <input
                         maxLength={255}
                         type="text" 
                         className='p-4 border border-[#DADADA] rounded-md' placeholder='Enter your Last Name'/>
                    </div>
                </div>
            <div className='flex flex-col gap-3 w-3/4'>
                <div className='flex flex-col relative'>
                    <label htmlFor="">Email</label>
                    <input 
                    maxLength={255}
                    type="email" 
                    className='p-4 border border-[#DADADA] rounded-md' placeholder='Enter your Email' />
                    <button 
                    type='button'
                    onClick={()=> {setVerification(true);}}
                    className='absolute top-8 right-2 cursor-pointer bg-[#EA454C] transition-all hover:bg-red-400 p-2 rounded-md text-white'>Send code
                    </button>
                    {openVerification &&
                        <SendCode closeVerification={setVerification} 
                    />}
                   
                </div>      
                <div className='flex flex-col relative w-full'>
                    <label htmlFor="">Password</label>
                    <div className='flex justify-end  items-center '>
                        <input type={`${isVisible ? "text" :"password"}`} className='p-4 border border-[#DADADA] rounded-md w-full ' placeholder='**********' />
                        
                        <TogglePassword setValue={setIsVisible} value={isVisible}/>
                    </div>
                </div>  
                <div className='flex flex-col relative w-full'>
                    <label htmlFor="">Confirm Password</label>
                    <div className='flex justify-end items-center w-full '>
                        <input type={`${isVisible ? "text" :"password"}`}className='p-4 border border-[#DADADA] rounded-md w-full' placeholder='**********'/>
                      
                        <TogglePassword setValue={setIsVisible} value ={isVisible}/>
                    </div>
                </div>  
            </div>
            <div className='flex w-3/4 gap-2'>
                <input type="checkbox" id='checkbox' className='cursor-pointer'/>
                <label htmlFor="checkbox" className='cursor-pointer'>By continuing, agree to our <Link href={''} className='text-blue-700'>terms of service</Link></label>
            </div>
            <div className='flex flex-col w-full items-center gap-4'>
                <Link href="/auth/loginform/" className='flex p-4 border w-3/4 rounded-md bg-[#EA454C] hover:bg-red-400 text-white cursor-pointer justify-center'>Register</Link>
                <p>Already have an account? <Link href ="/auth/loginform/" className='text-blue-800'>Login</Link></p>
            </div>
        </div>
    </form>
    )
}

export default RegisterForm