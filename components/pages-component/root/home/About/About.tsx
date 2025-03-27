import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import images from '@/constants/Images'
const About = () => {
  return (
    <div className='px-12'>
        <div className='md:flex px-4 gap-x-4 my-24 items-end'>
            <div className='flex items-end gap-x-4 w-full md:w-1/2 mb-3'>
                <div className='hidden lg:block'>
                    <Image width={200} height={200} src={images.girl.girl} alt='' className='rounded-t-full '></Image>
                </div>
                <div>
                    <Image width={400} height={400} src={images.girl.girl} alt='' className='rounded-t-[100%]'></Image>
                </div>
            </div>
            <div className='w-full md:w-1/2 flex flex-col gap-6 md:gap-12 text-left justify-center '>
                <div className='flex  flex-col gap-2'>   
                    <span className='text-xl capitalize text-red-500'>about florist</span>
                    <h3 className='font-bold text-2xl lg:text-5xl cormorant mb-7'>Blossoming Your Special Moments with Nature&apos;s Finest</h3>
                    <p className='text-gray-600'>Welcome to Florist, where floral artistry meets passion for nature&apos;s beauty. Our story is rooted in a deep love for flowers and a commitment to creating unforgettable moments for our customers.</p>
                </div>
                <div className='mb-6'>
                    <Link href={""} className='text-xs md:text-sm uppercase bg-red-500 py-3 md:py-5 px-6 md:px-8 rounded-xl text-white hover:bg-red-400 '>
                            read more
                    </Link>
                </div>
            </div>
        </div>  
    </div>
    
    
  )
}

export default About