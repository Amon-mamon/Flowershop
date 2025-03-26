"use client"
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='relative w-full h-screen flex justify-center items-center bg-[url(/assets/images/flowersbg.jpg)] bg-no-repeat bg-cover'>
        <div className='absolute top-0 left-0 w-full h-full bg-black/80'>
        </div>
        <div className='text-center w-[800px] z-10 mt-16 md:my-auto px-8'>
            <h3 className='capitalize text-white'>welcome to florist</h3>
            <p className=' text-2xl sm:text-4xl md:text-6xl cormorant font-bold text-white mt-4'>Let&apos;s Make Beautiful Flowers a Part of Your Life.</p>
            <p className='cormorant text-lg md:text-2xl text-white mt-4 px-4'>Explore a vibrant tapestry of blooms and arrangements that add color, fragrance, and elegance to your life. Discover the perfect floral expression for every moment and occasion.</p>
            <Link href={''} className='uppercase text-white py-3 px-4 bg-[#EA454C] hover:bg-red-400 transition-all w-25 md:w-35 rounded-md mt-6 mx-auto block text-xs md:text-sm'>shop now</Link>
        </div>
    </section>
  )
}
export default Hero