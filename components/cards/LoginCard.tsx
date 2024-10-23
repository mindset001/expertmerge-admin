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
import { useRouter } from 'next/navigation'; // Note: Fixed typo "navigate" -> "router"
import { superLogin } from '@/app/api/services/endpoints/login';
// Import the API call

const LoginCard = () => {
    const [password, setPassword] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');
    const router = useRouter(); // Fixed typo: navigate -> router
    const dispatch = useDispatch<AppDispatch>();
    
    const validateSchema = yup.object().shape({
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
        
        {/* Formik form for handling form data */}
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validateSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                setErr(''); // Reset error message
                try {
                    // Call the API service to perform login
                    const { response, error } = await superLogin(values);
                    if (error) {
                        setErr(error); // Set the error message
                    } else if (response) {
                        // Successfully logged in, store the user data and redirect
                        // dispatch(setUserProfile({ data: response })); // If you have user state management
                        router.push('/dashboard'); // Navigate to home on success
                    }
                } catch (err) {
                    setErr('An unexpected error occurred'); // Handle any unexpected errors
                }
                setSubmitting(false); // Reset form submission state
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
                    type={password ? 'text' : 'password'}
                    suffix={ password ? 
                        <EyeOutlined onClick={() => setPassword(prev => !prev)} />  
                        :  
                        <EyeInvisibleOutlined onClick={() => setPassword(prev  => !prev)} />
                    }
                    onChange={handleChange('password')}
                    errorMessage={errors.password}
                />
               
                {/* Display error alert if there's an error */}
                {err && <Alert type="error" showIcon message={err}/>}

                {/* Submit Button */}
                <div className='py-2 overflow-hidden mt-10'>
                    <ExpertButton
                        text="Sign in"
                        fullWidth
                        loading={isSubmitting} // Show loading indicator while submitting
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
