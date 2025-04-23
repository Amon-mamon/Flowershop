import Link from 'next/link'
import React from 'react'

interface Props {
    defaultStyle?:boolean
}
const Button:React.FC<Props> = ({defaultStyle = true}) => {
  return (
    <div className={`text-center ${defaultStyle ? "mb-6 md:mb-15 btn-scale " : "btn-scale mt-3 md:mt-16"}`}>
        <Link href={""} className="text-xs md:text-lg capitalize py-2 md:py-3 px-6 md:px-7 rounded-sm bg-[#EA454C] hover:bg-red-400 text-white">
         shop now
        </Link>
      </div>
  )
}
export default Button