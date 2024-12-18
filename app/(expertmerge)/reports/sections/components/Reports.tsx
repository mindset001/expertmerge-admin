import { div, main } from 'framer-motion/client'
import React from 'react'
import MessagesList from './Messages'
import Messages from './MessagesGroup'

function Reports() {
  return (
    <div>
        <MessagesList/>
        <Messages/>
    </div>
  )
}

export default Reports