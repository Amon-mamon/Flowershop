"use client"
import Footer from '@/components/common/Footer/Footer'
import NavBar from '@/components/common/Navbar/NavBar'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const authParams = ["/auth/loginform", "/auth/registerform"]
const Layout = ({children}: {children: ReactNode}) => {
    const  pathname = usePathname();
    const isAuthRoute = authParams.includes(pathname)
  return (
   <>
   {
    !isAuthRoute &&  <NavBar/>
   }
  
    <main>{children}</main>
    {
    !isAuthRoute &&  <Footer/>
   }
  
   
   </>
  )
}

export default Layout