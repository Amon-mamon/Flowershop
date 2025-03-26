import React, { Dispatch, SetStateAction } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { IoMdEyeOff } from 'react-icons/io'

const TogglePassword:React.FC<{value: boolean,setValue:Dispatch<SetStateAction<boolean>>}> = ({value, setValue}) => {
  return (
    <>
      {value ?
       <FaRegEye onClick={()=> setValue(!value)} className='cursor-pointer text-2xl absolute right-2 top-10' />
    : <IoMdEyeOff onClick={()=> setValue(!value)} className='cursor-pointer text-2xl absolute right-2 top-10' />
       }  
    </>
  )
}
export default TogglePassword