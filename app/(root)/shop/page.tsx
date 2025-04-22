import { flowerItems } from '@/components/pages-component/root/shop/flowersItems'
import Shop from '@/components/pages-component/root/shop/Shop'
import React from 'react'

const page = () => {
  return (
   <Shop flowerItems={flowerItems}/>
  )
}

export default page