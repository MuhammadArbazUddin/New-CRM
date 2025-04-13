import React from 'react'
import { useMailStore } from '../../../../store/useMailStore'

const Test = () => {
  const getInboxEmails = useMailStore((state) => state.getInboxEmails)
  const getSentEmails = useMailStore((state) => state.getSentEmails)
  const getAllUser = useMailStore((state) => state.getAllUser)
  
  const handleClick = () => {
    getInboxEmails();
    getSentEmails()
    getAllUser()
  }

  return (
    <div>
      <button onClick={handleClick}>Get Emails</button>
    </div>
  )
}

export default Test
