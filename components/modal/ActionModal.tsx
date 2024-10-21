import { Divider, Modal, ModalProps } from 'antd'
import { FC, ReactNode } from 'react'
import { Inter } from "next/font/google";
import Icon from '../icons/Icon';

const inter = Inter({ subsets: ["latin"] });
interface ActionModalProps extends ModalProps {
  text?: string | ReactNode;
  desc?: string | ReactNode;
}

const ActionModal: FC<ActionModalProps> = ({...props}) => {
  return (
    <Modal
    {...props}
    okButtonProps={{
      className: 'hidden'
    }}
    cancelButtonProps={{
      className: 'hidden'
    }}
    centered
    >
     <div className={`flex flex-col justify-center items-center my-6 ${inter.className}`}>
     <Icon name='verified'/>
     <div className='font-[500] text-[20px]'>{ props.text || 'Successful'}</div>
     <div className='font-[400] text-[14px] text-[#645D5D] text-center my-4'>
      { props.desc ? props.desc : <>Password Successfully Created! You can now log in <br />  with your email address and password.</> }
     </div>
     <Icon name='verified'/>
     </div>
    </Modal>
  )
}

export default ActionModal
