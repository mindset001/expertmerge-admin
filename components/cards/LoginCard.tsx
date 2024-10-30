"use client";
import { Alert, Card } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import ExpertButton from '../buttons/ExpertButton';

import * as yup from "yup";

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import TextInput from '../inputs/TextInputs';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/app/api/services/endpoints/login';

const LoginCard = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    const validationSchema = yup.object().shape({
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

  return (
    <Card className='rounded-[12px] w-[95%] mt-6 lg:w-[500px]'>
        <div className="text-center text-[24px] text-[#1B1818] font-[700]">
            Sign in with your email
        </div>
        <div className='text-[14px] text-center text-[#645D5D] font-[400]'>
        Use your email address to sign in to your account and manage your role 
        </div>
        
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                setErrorMessage('');
                try {
                    const { response, error } = await adminLogin(values);
                    console.log(error);
                    console.log(response);
                    
                    
                    if (error) {
                        setErrorMessage(error);
                    } 

                   if (response) {
                        // Successful login, redirect to dashboard
                        console.log('successful');
                        
                        router.push('/dashboard');
                        
                    }
                    setSubmitting(false);
                } catch {
                    setErrorMessage('An unexpected error occurred');
                   
                } 
                // finally {
                   
                // }
            }}
        >
         {({ handleChange, handleSubmit, isSubmitting, errors }) => (
            <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <TextInput
                    label="Email"
                    fullWidth
                    wrapperClassName='mt-4'
                    onChange={handleChange("email")}
                    errorMessage={errors.email}
                />
                {/* Password Field */}
                <TextInput
                    label="Password"
                    fullWidth
                    wrapperClassName='mt-4'
                    type={passwordVisible ? 'text' : 'password'}
                    suffix={
                        passwordVisible 
                        ? <EyeOutlined onClick={() => setPasswordVisible(prev => !prev)} />  
                        : <EyeInvisibleOutlined onClick={() => setPasswordVisible(prev  => !prev)} />
                    }
                    onChange={handleChange('password')}
                    errorMessage={errors.password}
                />
               
                {/* Display error alert if there's an error */}
                {errorMessage && <Alert type="error" showIcon message={errorMessage}/>}

                {/* Submit Button */}
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

export default LoginCard;
