"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TanStack = () => {

    const getComments = async () => {
   
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            if(!response.ok){
                const errorData = (await response).json()
                throw new Error (errorData.message || 'Error')
            }
            return (await response).json()
    }
    const{data, isLoading} = useQuery({
        queryFn:getComments,
        queryKey:['comments'],
        staleTime:1000 * 60 * 5
    })
    console.log(data)
  return (
    <div>

    </div>
  )
}

export default TanStack