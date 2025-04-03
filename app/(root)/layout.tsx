"use client"
import Footer from '@/components/common/Footer/Footer'
import NavBar from '@/components/common/Navbar/NavBar'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

const authParams = ["/auth/login", "/auth/register"]
const Layout = ({children}: {children: ReactNode}) => {
    const  pathname = usePathname();
    const isAuthRoute = authParams.includes(pathname)
  return (
   <>
    <SessionProvider>
   {
     !isAuthRoute &&  <NavBar/>
   }
    <main>
        {children}
      <ToastContainer position='top-right'/>
      </main>
    {
    !isAuthRoute &&  <Footer/>
   }
    </SessionProvider>
   </>
  )
}

export default Layout