import { NavBarMenuListProps } from '@/types'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import Icon from '../icons/Icon'

const PostBtn: FC<NavBarMenuListProps> = ({
    icon,
    text,
    className,
    onClick,
}) => {
  return (
    <motion.div 
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className={`text-[14px] cursor-pointer text-center flex justify-center gap-3  items-center min-w-[59px] px-2 font-[500] text-[#667185] ${className}`}>
      <Icon name={icon} />
      <span>{text || "Home"}</span>
    </motion.div>
  )
}

export default PostBtn
