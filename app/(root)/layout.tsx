"use client"
import Footer from '@/components/common/Footer/Footer'
import NavBar from '@/components/common/Navbar/NavBar'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

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
      </main>
    {
    !isAuthRoute &&  <Footer/>
   }
    </SessionProvider>
   </>
  )
}

export default Layout