import React from 'react'
import { useSelector } from 'react-redux'
import { getNotification } from '../reducers/NotificationReducer'

const Notification = () => {
  const notification = useSelector(getNotification)

  if (!notification) {
    return null
  }

  return (
    <div className={`${notification.type}`}>
      {notification.content}
    </div>
  )
}

export default Notification