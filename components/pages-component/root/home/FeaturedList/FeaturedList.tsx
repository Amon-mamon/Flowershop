"use client"
import React from 'react'
import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import Button from '@/components/reusable/button/Button';
import { FlowerItems } from '@/types/types';

interface FeaturedListProps {
  flower: FlowerItems[];
}
const FeaturedList: React.FC<FeaturedListProps> = ({flower}) => {
  return (
    <div id="featured" className="flex flex-col w-full justify-around relative gap-10 border-b-1 border-red-500">
      <p className="text-center text-6xl font-bold cormorant text-red-400">Featured Product</p>
      <div className="text-center">
        <p className="text-3xl md:text-5xl font-bold cormorant ">Discover Our Exquisite Handmade Flowers</p>
        <p className="font-bold text-lg md:text-2xl cormorant">Timeless beauty, handcrafted to perfection—our exquisite handmade flowers bring elegance that lasts forever.</p>
      </div>
      <div className="justify-center flex flex-wrap gap-4">
        {flower.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 group relative">
            <div className="text-white">
              <div title="add to cart" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-[#EA454C]/60 rounded-4xl p-4 hover:bg-red-400 hover:transition-all">
                <FaShoppingCart />
              </div>
              <Image width={350} height={350} src={item.image} alt={item.title} className="rounded-sm" />
            </div>
            <div className="text-center">
              <h2 className="text-xl md:text-3xl mb-2 cormorant font-bold">{item.title}</h2>
              <p className="text-gray-600">
                <span className="text-sm md:text-xl font-bold"> Price:</span>
                <span className="text-xs md:text-lg">{item.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
     <Button/>
    </div>
  );
}
export default FeaturedList;