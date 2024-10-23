import React from 'react'
import NewUsersChart from './Chart'
import GroupsPage from './components/Group'

function TotalGroups() {
  return (
    <div className='flex flex-col gap-6'>
        <NewUsersChart/>
        <GroupsPage/>
    </div>
  )
}

export default TotalGroups