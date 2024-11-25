"use client";
import { Alert, Card } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import ExpertButton from '../buttons/ExpertButton';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import TextInput from '../inputs/TextInputs';
import ActionModal from '../modal/ActionModal';
import { createPassword } from '@/app/api/services/endpoints/login';
import { usePathname } from 'next/navigation';

const PasswordCard = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();

    // Extract the token from the URL path
    const token = pathname?.split('/create-password/')[1]; // Extract everything after 'create-password/'

    console.log('The token:', token);

    const validateSchema = yup.object().shape({
        password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), ''], 'Passwords must match')
            .required('Please confirm your password'),
    });

    return (
        <Card className='rounded-[12px] w-[95%] mt-6 lg:w-[500px]'>
            <div className="text-center text-[24px] text-[#1B1818] font-[700]">
                Create Password
            </div>
            <div className='text-[14px] text-center text-[#645D5D] font-[400]'>
                Create a secure password to safeguard your account.
            </div>
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={validateSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    setErr("");
                    try {
                        const result = await createPassword(
                            { password: values.password },
                            {
                                headers: token ? { Authorization: `Bearer ${token}` } : {},
                            }
                        );
                        if (result.response) {
                            setOpen(true); // Display success modal
                        } else {
                            setErr(result.error);
                        }
                    } catch (error) {
                        setErr("An unexpected error occurred");
                    }
                    setSubmitting(false);
                }}
            >
                {({ handleChange, handleSubmit, isSubmitting, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Password"
                            fullWidth
                            wrapperClassName='my-4'
                            type={passwordVisible ? 'text' : 'password'}
                            suffix={passwordVisible ?
                                <EyeOutlined onClick={() => setPasswordVisible(prev => !prev)} /> :
                                <EyeInvisibleOutlined onClick={() => setPasswordVisible(prev => !prev)} />
                            }
                            onChange={handleChange('password')}
                            errorMessage={errors.password}
                        />
                        <p className='italic text-[#D42620] font-[400] text-[14px]'>
                            Your password must be at least 8 characters long and include a combination of letters, numbers, and special characters for enhanced security.
                        </p>
                        <TextInput
                            label="Confirm Password"
                            fullWidth
                            wrapperClassName='mt-4'
                            type={passwordVisible ? 'text' : 'password'}
                            suffix={passwordVisible ?
                                <EyeOutlined onClick={() => setPasswordVisible(prev => !prev)} /> :
                                <EyeInvisibleOutlined onClick={() => setPasswordVisible(prev => !prev)} />
                            }
                            onChange={handleChange('confirmPassword')}
                            errorMessage={errors.confirmPassword}
                        />
                        {err && <Alert message={err} type="error" showIcon className="mt-4" />}
                        <div className='py-2 overflow-hidden mt-10'>
                            <ExpertButton
                                text="Create Password"
                                fullWidth
                                loading={isSubmitting}
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                )}
            </Formik>
            <ActionModal 
                open={open}
                onCancel={() => setOpen(false)}
            />
        </Card>
    );
};

export default PasswordCard;
