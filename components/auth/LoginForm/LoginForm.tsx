"use client"
import React from 'react'
import Link from 'next/link'
import Aside from '@/components/reusable/sidecontent/aside';
import { useState } from "react"
import { z } from "zod";
import { signIn } from 'next-auth/react';   
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import icons from '@/constants/icons';
import { toast } from 'react-toastify';

const schema = z
  .object({
    email: z.string().email("Invalid email format."),
    password: z
      .string()
      .min(1, 'Password is Required')
  })
 
const LoginForm = () => {
    const router = useRouter()
    const[isVisible, setIsVisible] =useState(false)
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit, 
        formState: { errors },
      } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:{
          email:'',
          password:'',
        }
      });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setLoading(true)
        const loginData = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false,
        });

      
        if(loginData?.error){
            toast.error(loginData.error)
            setLoading(false)
            return;
        }else {
            router.push("/")
            toast.success("Login Successfully")
        }
    }
     
  return (
    <div className='flex h-screen'> 
    <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full justify-center items-center gap-6'>
        <div className='flex flex-col items-center gap-2'>
            <h1 className='font-semibold text-4xl'>WELCOME BACK</h1>
            <p className='text-gray-500'>Welcome back! Please enter your details.</p>
        </div>
        <div className='flex flex-col gap-4 justify-center items-center w-3/4'>
            <div className=' flex flex-col gap-1 w-full'>
                <label htmlFor="">Email</label>
                <input {...register("email")} type="text" placeholder='Enter your email' className='p-4 border border-gray-400 rounded-lg' required/>
            </div>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <div className='flex flex-col gap-1 relative  w-full'>
                <label htmlFor="">Password</label>
                <input {...register("password")}type={isVisible ? "text" : "password"} placeholder='********' className='p-4 border border-gray-400 rounded-lg  '  required/>
                <button type='button' onClick={()=> setIsVisible(!isVisible)}>
                    
                    { isVisible ? 
                            <icons.FaRegEye className='cursor-pointer text-2xl absolute right-3 top-11' />
                        : <icons.IoMdEyeOff className='cursor-pointer text-2xl absolute right-3 top-11' />
                        }
                    </button>                
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <div className='flex w-full justify-between'>
                <div className='flex gap-2'>
                    <input type="checkbox" id='checkbox' className=' cursor-pointer' />
                    <label htmlFor="checkbox" className='cursor-pointer'>Remember me</label>
                </div>
                <div className='flex'>
                    <Link href = "" className='text-red-500'>Forgot password?</Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full gap-2'>
                <button type='submit' className='hover:bg-red-400 bg-[#EA454C] w-full text-center py-3 text-white rounded-xl cursor-pointer'>{loading  ? "Signing in..." :"Sign in"}</button>
                <button className='flex w-full py-3 rounded-xl justify-center items-center border border-gray-400 gap-2 cursor-pointer'>
                        <icons.FcGoogle/>
                        <Link href ="" className=''>Sign in with Google</Link>
                </button>
                <button className='flex w-full py-3 rounded-xl justify-center items-center bg-black gap-3 cursor-pointer'>
                        <icons.FaGithub className='text-white' />
                        <Link href ="https://github.com/" className='text-white'>Sign in with Github</Link>
                </button>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <label htmlFor="" className='text-sm'>Don&apos;t have an account? <Link href = "/auth/register/" className='text-red-500 text-sm'>Sign up for free!</Link></label>   
        </div>
    </form>
            <Aside/> 
    </div>  
  )
}
export default LoginForm