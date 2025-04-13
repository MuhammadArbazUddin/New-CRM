import React from 'react'
import { useMailStore } from '../../../../store/useMailStore'

const Test = () => {
 
  const {getDraftEmails, getAllUser, getSentEmails ,getInboxEmails, getImportantEmails, getStarredEmails,getTrashEmails} = useMailStore()
  const handleClick = () => {
    getInboxEmails();
    getSentEmails()
    getAllUser()
    getDraftEmails()
    getImportantEmails()
    getStarredEmails()
    getTrashEmails()
  }

  return (
    <div>
      <button onClick={handleClick}>Get Emails</button>
    </div>
  )
}

export default Test
