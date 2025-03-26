
"use client"
import { PiFlowerTulipBold } from "react-icons/pi";
import { GiRose } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

interface Highlights {
  icon:React.ReactNode;
  title:string;
  description:string;
}
const Services = () => {

  const services:Highlights[] = [
    {
      icon:<PiFlowerTulipBold />,
      title:"Premium Handmade Flowers",
      description:"Beautifully crafted, long-lasting handmade flowers for every special moment."

    },
    {
      icon:<GiRose/>,
      title:"Wide Selection of Flower Design",
      description:"From elegant bouquets to custom arrangements, find the perfect creation."
    },
    {
      icon:<FaHandsHelping />,
      title:"Exceptional Craftsmanship & Service",
      description:"We ensure every flower is meticulously handcrafted with attention to detail."

    },
    {
      icon:<MdLocalShipping />,
      title:"Quick & Reliable Delivery",
      description:"Enjoy fast and secure delivery to make your special moments unforgettable."

    },
  ]
  return (
    <div className="lg:flex px-8 py-16 gap-2">
        {services.map((item, index) =>(
          <div
            key={index}
            className="lg:flex items-start lg:border-l border-[#EA454C] text-center lg:text-left w-full gap-3 px-2 py-2"
          >
            <div className=" flex items-center justify-center md:mt-4">
              <span className="text-2xl text-[#EA454C] bg-gray-100 rounded-[100%] p-4 mb-8">{item.icon}</span>
            </div>
            <div >
              <h3 className="text-xl md:text-2xl font-bold mb-2 cormorant ">{item.title}</h3>
              <p className="cormorant text-lg">{item.description}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Services