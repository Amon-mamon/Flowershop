"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const Content = () => {
    const router = useRouter()
  return (
    <div>
        404
        <button onClick={() => router.back()}>
            go back
        </button>
    </div>
        
  )
}

export default Content