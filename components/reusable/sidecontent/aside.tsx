import React from 'react'
import Image from 'next/image'
import images from '../../../constants/Images'
const Aside = () => {
  return (
    <div className=' w-full justify-end hidden lg:block'>
        <Image src={images.aside.aside} alt= "aside" className='w-full max-h-screen'></Image>
    </div>
  )
}

export default Aside