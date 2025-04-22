"use client"
import React from 'react'
import icons from '@/constants/icons';
import Link from 'next/link';
import { FlowerItems } from '@/types/types';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';


interface FlowerItemsProp {
  flowerItems:FlowerItems[]
}

const Shop:React.FC<FlowerItemsProp>= ({flowerItems}) => {
  return (
    <div className='h-[900px] w-full border flex'>
        <div className='w-lg flex justify-center items-start'>
            <div className='flex border border-gray-300 items-center py-3 px-3 mt-12 w-80 justify-between'>
                <icons.CiSearch className='text-3xl cursor-pointer text-gray-500'/>
                <input type="text" placeholder='Search Products' className='outline-none'  />
                <icons.IoIosArrowRoundForward className='cursor-pointer text-3xl bg-red-400 text-white'/>
            </div>
        </div>
        <div className='w-full flex flex-col px-12'>
          <div className='mt-12 flex'>
            <div className='w-full'>
                <p className='mb-6'><Link href={"/"}>Home </Link>/ Shop</p>
                <div className='flex items-center w-full justify-between px-8'>
                  <div>
                      <p className='ml-12 text-5xl cormorant font-bold'>Shop</p>
                  </div>
                  <div className='border p-2'>
                      <select className='outline-none'>
                        <optgroup label="Category 1">
                            <option>Item 1</option>
                            <option>Item 2</option>
                        </optgroup>
                        <optgroup label="Category 2">
                            <option>Item 3</option>
                            <option>Item 4</option>
                        </optgroup>
                      </select>
                  </div>
                </div>
              </div>
          </div>
          <div className='grid grid-cols-3 gap-4 mt-4 overflow-y-auto'>
          {flowerItems.map((item)=>(
            <div key={item.id} className='flex  w-full bg-red-300 rounded-b-sm'>
                <div key={item.id} className="flex flex-col group relative w-full">
                            <div className="text-white w-full">
                              <div title="add to cart" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-[#EA454C]/60 rounded-4xl p-4 hover:bg-red-400 hover:transition-all">
                                <FaShoppingCart />
                              </div>
                              <div className='w-full h-[200]'>
                                <Image width={200} height={200} src={item.image} alt={item.title} className="rounded-sm object-cover w-full h-full" />
                              </div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl md:text-3xl mb-2 cormorant font-bold">{item.title}</h2>
                                <p className="text-gray-600">
                                  <span className="text-sm md:text-xl font-bold"> Price:</span>
                                  <span className="text-xs md:text-lg">{item.price}</span>
                                </p>
                            </div>
                    </div>
            </div>
          ))}
          </div>
          
           
        </div>
    </div>
  )
}

export default Shop