import React from 'react'
import SectionOne from './sections/SectionOne'

import NotificationPreferences from './sections/SectionTwo'
import PostList from './sections/SectionOne'

function page() {
  return (
    <main className='scrollbar-hide'>
        <div className='border-b mb-4 py-4'><h1 className='text-[24px] font-[500] text-[#1D2739]'>Notifications</h1></div>

        <div className='w-[90%] flex justify-between px-10 py-6 overflow-scroll scrollbar-hide'>
            <div className='w-[60%]'>
            <PostList/>
            </div>
            <div className='w-[35%] scrollbar-hide overflow-scroll'>
            <NotificationPreferences/>
            </div>
        </div>
    </main>
  )
}

export default page