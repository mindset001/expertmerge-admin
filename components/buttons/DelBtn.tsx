"use client"
import React, { FC } from 'react'
import Icon from '../icons/Icon'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { NavBarMenuListProps } from '@/types'

const DelBtn: FC<NavBarMenuListProps> = ({

  text,
  onClick,
  route,
  className
}) => {
  const pathname = usePathname()
  console.log(pathname, route);
  
  return (
    <motion.div 
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className={`text-[14px] cursor-pointer border-b  ${ pathname === `/${route}` ? 'border-b-[#344054] text-[#344054]' : 'border-b-[#98A2B3] text-[#98A2B3] border-b-[0.5px]'} text-center inline-block min-w-[59px] px-2 font-[500] ${className}`}>
      <div className='flex justify-center items-center mb-1'>
       </div>
      {text || "Home"}
    </motion.div>
  )
}

export default DelBtn