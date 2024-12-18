import React from 'react'
import NewUsersChart from './Chart'
import ProfessionalProfile from './components/Professional'

function TotalUser() {
  return (
    <div>
      <div className='flex flex-col gap-6'>
        <NewUsersChart/>
        <ProfessionalProfile/>
      </div>
    </div>
  )
}

export default TotalUser
