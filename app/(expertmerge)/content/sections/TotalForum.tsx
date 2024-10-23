import React from 'react'
import ForumList from './components/Forum'
import NewUsersChart from './Chart'

function TotalForum() {
  return (
    <div className='flex flex-col gap-6'>
        <NewUsersChart/>
        <ForumList/>
    </div>
  )
}

export default TotalForum