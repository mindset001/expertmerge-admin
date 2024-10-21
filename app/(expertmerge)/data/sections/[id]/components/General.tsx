import React, { useState } from 'react'
import Avatar from '@/assets/matcap.jpeg'
import Frame from '@/assets/Frame.png'
import Image from 'next/image'
import ExpertButton from '@/components/buttons/ExpertButton'
import { Switch, Typography } from "antd";

const { Text } = Typography;

function General() {
  const [checked, setChecked] = useState(true);

  const handleToggleChange = (checked: boolean) => {
      setChecked(checked);
      console.log('Toggle switch is:', checked ? 'On' : 'Off');
      // You can handle the toggle state here, e.g., send the status to an API or store it in state management
  };
  return (
    <div className='flex gap-10'>
      <div className='w-[30%] flex flex-col items-center gap-4'>
        <div>
          <div>
          <Image src={Frame} alt='frame' className='w-full h-[150px] z-0'/>
          </div>
          <div className='mt-[-15%] ml-[25%] rounded-full w-[175px] h-[175px] bg-[white] flex justify-center items-center'>
            <Image src={Avatar} alt='avatar' className='rounded-full w-[90%] h-[90%]'/>
          </div>
        </div>
        <div className="w-[80%] flex items-center justify-between border rounded-[100px] border-[#0A424A] p-2">
            <Text className="mr-2">Allow to view all members</Text>
            <div className='flex items-center gap-2'>
              <p>On</p>
            <Switch
                checked={checked}
                onChange={handleToggleChange}
              
                className="ml-auto"
            />
            </div>
            
        </div>
      </div>

      <div className='flex flex-col gap-6 w-[60%]'>
        <div className='flex gap-6'>
          <div >
            <h3 className='text-[14px] font-[500] text-[#101928]'>Full Name</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>Clifford Morgan

            </p>
          </div>
          <div >
            <h3 className='text-[14px] font-[500] text-[#101928]'>Date of Birth</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>May 02

            </p>
          </div>
          <div >
            <h3 className='text-[14px] font-[500] text-[#101928]'>Location</h3>
            <p className='text-[18px] font-[400] text-[#98A2B3]'>Glasgow, United Kingdome

            </p>
          </div>

        </div>
        <div >
          <h3 className='text-[14px] font-[500] text-[#101928]'>Headline</h3>
          <p className='text-[18px] font-[400] text-[#98A2B3]'>reative Brand/Product Designer | Transforming Vision into Reality | Empowering Startups and VC Funds with Scalable Design Solutions | Leveraging Innovation to Shape Memorable Experiences.
          </p>
        </div>
        <div>
          <h3 className='text-[14px] font-[500] text-[#101928]'>About</h3>
          <p className='text-[18px] font-[400] text-[#98A2B3]'>I am an experienced brand and product designer with a passion for empowering startups and VC funds. I specialize in creating visually stunning and impactful design solutions that help businesses elevate their brand and product offerings, based on a deep understanding of their target audience, business objectives, and
            competitive landscape. <br /> <br />

            My diverse portfolio includes clients from various industries, and my work has earned recognition from peers and clients, with designs featured in publications. I am a dedicated problem-solver and always excited to make new acquaintances and collaborate, so feel free to reach out to me anytime! <br /> <br />

            Are you interested in partnering on a project? Let's chat 😊 <br /><br />

            You can email me at tajusodiq1901@gmail.com</p>
        </div>

        <div>
        <ExpertButton text='Block Clifford'/>
        </div>
      </div>
    </div>
  )
}

export default General