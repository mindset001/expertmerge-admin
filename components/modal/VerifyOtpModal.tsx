import { Card, Modal, ModalProps } from 'antd'
import { Formik } from 'formik'
import { FC, useState } from 'react'
import ExpertButton from '../buttons/ExpertButton'
import AuthCode from 'react-auth-code-input'
interface OtpModalProps extends ModalProps {
    onOtpVerified?: (e?: any) => void
}
const VerifyOtpModal: FC<OtpModalProps> = ({ onOtpVerified, onCancel, ...props}) => {
  // const { userDetails } = useSelector((state: RootState) => state.onboarding)
  const [success, setSuccess] = useState('')
  const [err, setErr] = useState<string>('')

 
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
    <div className="text-center text-[20px] text-[#0A424A] lg:text-[30px] ">
            Confirm your Email Address
        </div>
        <div className='text-[14px] text-center text-[#645D5D] font-[400] lg:text-[20px] mb-3'>
        Type in the code we sent 
        </div>
        <Formik
        onSubmit={async (v, { setSubmitting }) => {
        setSubmitting(true)
        const storedUserId = localStorage.getItem("userId");
         const userId =  JSON.stringify(storedUserId) ;
         console.log(userId);
         
        // const { response, error } = await verifyResetOtp({
        //   userId:  userId,
        //   otp: v.otp
        // })
        // if(error) return setErr(error)
        onOtpVerified && onOtpVerified()
        setSubmitting(false)
      //  setErr(error)
        
      }}
      initialValues={{otp: ''}}
     
        >
         {({setFieldValue, handleSubmit, isValid, isSubmitting}) => (
            <form action="">
                <AuthCode
                allowedCharacters="numeric"
                onChange={(v: any) =>  setFieldValue('otp', v, true)}
                autoFocus
                length={5}
                containerClassName="flex justify-center gap-3"
                inputClassName="w-[80px] h-[65px] text-center border border-[#D0D5DD] rounded-[6px]" 
              />
                <div className='py-2 mt-4'>
                <ExpertButton
                text="Continue"
                fullWidth
                loading={isSubmitting}
                onClick={handleSubmit}
                />
                </div>
                <p>{err}</p>

                <div className='text-[14px] mt-4 text-[#475367] font-[400] text-center'>Didn't get OTP <span className='text-[#00626F] underline cursor-pointer'  >click here to resend</span></div>
                <p>{success}</p>
            </form>
         )}
        </Formik>
    </Card>
    </Modal>
  )
}

export default VerifyOtpModal
