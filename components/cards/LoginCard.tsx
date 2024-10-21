"use client"
import { Alert, Card, Divider } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import ExpertButton from '../buttons/ExpertButton'

import * as yup from "yup"

import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import TextInput from '../inputs/TextInputs'
import { useRouter } from 'next/navigation'

const LoginCard = () => {
    const [password, setPassword] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [openOtp, setOpenOtp] = useState<boolean>(false)
    const [openConfirmPassword, setOpenConfirmPassword] = useState<boolean>(false)
    const [err, setErr] = useState<string>('')
    const naviagte = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    
    const validateSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

  return (
    <Card
    className='rounded-[12px] w-[95%] mt-6 lg:w-[500px]'
    >
        <div className="text-center text-[24px] text-[#1B1818] font-[700]">
            Sign in with your email
        </div>
        <div className='text-[14px] text-center text-[#645D5D] font-[400]'>
        Use your email address to sign in to your account and manage your role 
        </div>
        <Formik
       onSubmit={async (v, { setSubmitting }) => {
        setSubmitting(true)
        setErr('')
        // const { error, response } = await login(v)
        // if(error) return setErr(error)
        //  response && dispatch(setUserProfile({ data: response }))
          naviagte.push('/home')
          setSubmitting(false)
      }}
        initialValues={{ email: "", password: "" }}
        validationSchema={validateSchema}
        >
         {({ handleChange, handleSubmit, isSubmitting, errors }) => (
            <form action="">
                <TextInput
                label="Email"
                fullWidth
                wrapperClassName='mt-4'
                onChange={handleChange("email")}
                errorMessage={errors.email}
                />
                 <TextInput
                label="Password"
                fullWidth
                wrapperClassName='mt-4'
                type={password ? 'text' : 'password'}
                suffix={ password ? 
                <EyeOutlined  onClick={() => setPassword(prev => !prev)} />  :  
                <EyeInvisibleOutlined onClick={() => setPassword(prev  => !prev)} />   }
                onChange={handleChange('password')}
                errorMessage={errors.password}
                />
               
                {err && <Alert type="error"  showIcon message={err}/>}
                <div className='py-2 overflow-hidden mt-10'>
                <ExpertButton
                text="Sign in"
                fullWidth
                loading={isSubmitting}
                onClick={handleSubmit}
                />
                </div>
          

                
            </form>
         )}
        </Formik>
      
      
    </Card>
  )
}

export default LoginCard
