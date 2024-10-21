import { Alert, Card, Divider, Modal, ModalProps } from 'antd'
import  { FC, useState } from 'react'
import ExpertButton from '../buttons/ExpertButton'
import { Formik } from 'formik'
import * as yup from "yup"
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import TextInput from '../inputs/TextInputs'

interface ResetModalProps extends ModalProps {
    onReset?: (e?: any) => void
}

const ResetPasswordModal: FC<ResetModalProps> = ({ onReset , onCancel, ...props}) => {
    const validateSchema = yup.object().shape({
        email: yup.string().email().required(),
    })
    const [err, setErr] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

  return (
    <Modal
    {...props}
    onCancel={onCancel}
    okButtonProps={{
        className: 'hidden',
    }}
    cancelButtonProps={{
        className: 'hidden',
    }}
    className='top-[18em]'
    >
    <Card
    bordered={false}
    >
    <div className="text-center text-[24px] text-[#1B1818] font-[700]">
            Reset password
        </div>
        <div className='text-[14px] text-center text-[#645D5D] font-[400]'>
            Please enter your email or phone number to receive a code for resetting your password.
        </div>
        <Formik
        onSubmit={async (v, { setSubmitting }) => {
       
            setSubmitting(true)
            setErr('')
          
            
        //   if(error) return setErr(error)
           onReset && onReset()
        }}
        initialValues={{email: ''}}
        validationSchema={validateSchema}
        >
         {({ handleChange, handleSubmit, errors, isSubmitting }) => (
            <form action="">
                <TextInput
                label="Email"
                fullWidth
                wrapperClassName='mt-4'
                onChange={handleChange('email')}
                errorMessage={errors.email}
                />

                {err && <Alert type="error"  showIcon message={err}/>}
               
                <div className='py-2 mt-4'>
                <ExpertButton
                text="Reset Password"
                loading={isSubmitting}
                fullWidth
                onClick={handleSubmit}
                />
                </div>
                <div className='py-2 '>
                <ExpertButton
                text="Cancel"
                fullWidth
                outlined
                onClick={onCancel}
                />
                </div>
                <Divider><span className='text-[#667185] font-[400] text-[10px] lg:text-[14px]'>Or</span></Divider>

                <div className='text-[14px] text-[#475367] font-[400] text-center'>Don’t have an account? <span className='text-[#00626F] font-[600]'><Link href='/onboarding'>sign up</Link></span></div>
            </form>
         )}
        </Formik>
    </Card>
    </Modal>
  )
}

export default ResetPasswordModal
