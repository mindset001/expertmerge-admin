import React from 'react'
import DashboardStats from './sections/Header'
import NewUsersChart from './sections/Chart'
import AdminNotifications from './sections/Notification'


function page() {
  return (
    <main className=''>
        <div className='border-b mb-4 pb-4'><h1 className='capitalize'>dashboard</h1></div>
        <div className='flex flex-col items-start gap-4'>
            <DashboardStats/>
            <NewUsersChart/>
            <AdminNotifications/>
        </div>
    </main>
  )
}

export default page