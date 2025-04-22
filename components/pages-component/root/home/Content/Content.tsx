import React from 'react'
import Hero from '../Hero/Hero'
import Services from '../Services/Services'
import FeaturedList from '../FeaturedList/FeaturedList'
import About from '../About/About'
import { flowerData } from '../FeaturedList/featuredFlowers'

const Content = () => {
  return (
    <>
    <Hero/>
    <Services/>
    <FeaturedList flower={flowerData}/>
    <About/>
    </>
  )
}

export default Content