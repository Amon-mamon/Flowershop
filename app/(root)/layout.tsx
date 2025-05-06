"use client"
import Footer from '@/components/common/Footer/Footer'
import NavBar from '@/components/common/Navbar/NavBar'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const authParams = ["/auth/login", "/auth/register"]
const Layout = ({children}: {children: ReactNode}) => {
    const  pathname = usePathname();
    const isAuthRoute = authParams.includes(pathname)
    const queryClient = new QueryClient()
  return (
   <>
    <SessionProvider>
   {
     !isAuthRoute &&  <NavBar/>
   }
    <main>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
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