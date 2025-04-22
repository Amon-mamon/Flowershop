"use client"
import Button from '@/components/reusable/button/Button'
import React from 'react'

const Hero = () => {
  return (
    <section id='home' className='relative w-full h-screen flex justify-center items-center bg-[url(/assets/images/flowersbg.jpg)] bg-no-repeat bg-cover'>
        <div className='absolute top-0 left-0 w-full h-full bg-black/80'>
        </div>
        <div className='text-center w-[800px] z-10 mt-16 md:my-auto px-8'>
            <h3 className='capitalize text-white cormorant text-2xl'>welcome to florist</h3>
            <p className=' text-2xl sm:text-4xl md:text-6xl cormorant font-bold text-white mt-4'>Let&apos;s Make Beautiful Flowers a Part of Your Life.</p>
            <p className='cormorant text-lg md:text-2xl text-white mt-4 px-4'>Explore a vibrant tapestry of blooms and arrangements that add color, fragrance, and elegance to your life. Discover the perfect floral expression for every moment and occasion.</p>
            <Button defaultStyle={false}/>
        </div>
    </section>
  )
}
export default Hero