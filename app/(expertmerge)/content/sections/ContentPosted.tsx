import React from 'react'
import Content from './components/Content'
import NewUsersChart from './Chart'

function ContentPosted() {
  return (
    <div className='flex flex-col gap-6'>
      <NewUsersChart/>
      <Content/>
    </div>
  )
}

export default ContentPosted