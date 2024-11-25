import LoginCard from '@/components/cards/LoginCard'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Loop from "@/assets/loop.png"
import Icon from '@/components/icons/Icon'
import PasswordCard from '@/components/cards/PasswordCard'

function Login() {
  return (
    <div className='h-[100vh] bg-[#0A424A] relative overflow-hidden'>
      <div className='flex justify-between px-8 pt-8'>
        <Icon name='logo'/>
       
          
      </div>
      <div className='h-full flex flex-col items-center pt-6 relative z-50 w-full'>
          {/* <div className='text-[#EAFCFF] text-[28px] font-[500] lg:w-[65%] lg:text-[48px] text-center'>
          Sign in to your account
          </div> */}
          <PasswordCard />
      </div>
     <Image alt='image' src={Loop} className='absolute -bottom-28 right-0 z-0 h-full'/>
    </div>
  
  )
}

export default Login