import icons from '@/constants/icons'
import React, { Dispatch, SetStateAction } from 'react'

const TogglePassword:React.FC<{value: boolean,setValue:Dispatch<SetStateAction<boolean>>}> = ({value, setValue}) => {
  return (
    <>
      {value ?
       <icons.FaRegEye onClick={()=> setValue(!value)} className='cursor-pointer text-2xl absolute right-2 top-10' />
    : <icons.IoMdEyeOff onClick={()=> setValue(!value)} className='cursor-pointer text-2xl absolute right-2 top-10' />
       }  
    </>
  )
}
export default TogglePassword