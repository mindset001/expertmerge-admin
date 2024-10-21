import { Card, Divider, Modal, ModalProps } from 'antd'
import  { FC, useState } from 'react'
import TextInput from '../inputs/TextInput'
import ExpertButton from '../buttons/ExpertButton'
import { Formik } from 'formik'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

interface ConfirmResetModalProps extends ModalProps {
    onCreatePassword?: (e?: any) => void
}

const CreatePasswordModal: FC<ConfirmResetModalProps> = ({ onCreatePassword , onCancel, ...props}) => {
    const [password, setPassword] = useState<boolean>(false)
    const [confirmpassword, setConfirmPassword] = useState<boolean>(false)
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
        onSubmit={() => {}}
        initialValues={{}}
        >
         {() => (
            <form action="">
                 <TextInput
                label="New Password"
                fullWidth
                wrapperClassName='mt-4'
                type={password ? 'text' : 'password'}
                suffix={ password ? 
                <EyeOutlined  onClick={() => setPassword(prev => !prev)} />  :  
                <EyeInvisibleOutlined onClick={() => setPassword(prev  => !prev)} />   }
                />
                <div className='text-[14px] font-[400] italic text-[#D42620]'>
                Your password must be at least 8 characters long and include a combination of letters, numbers, and special characters for enhanced security
                </div>
               <TextInput
                label="Repeat New Password"
                fullWidth
                wrapperClassName='mt-4'
                type={confirmpassword ? 'text' : 'password'}
                suffix={ confirmpassword ? 
                <EyeOutlined  onClick={() => setConfirmPassword(prev => !prev)} />  :  
                <EyeInvisibleOutlined onClick={() => setConfirmPassword(prev  => !prev)} />   }
                />
                <div className='py-2 mt-4'>
                <ExpertButton
                text="Set New Password"
                fullWidth
                onClick={onCreatePassword}
                />
                </div>
            </form>
         )}
        </Formik>
    </Card>
    </Modal>
  )
}

export default CreatePasswordModal
