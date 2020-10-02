export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const setVoteNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content,
    },
  }
}

const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return `you voted for '${action.data.content}'`
    case 'CLEAR_NOTIFICATION':
      return null
    case 'NEW_ANECDOTE':
      return `you added the anecdote '${action.data.content}'`
    default:
      return state
  }
}

export default NotificationReducer