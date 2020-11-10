export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

let timer;

export const setNotification = (content, time) => {
  return async dispatch => {

    clearTimeout(timer)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })

    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

const NotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default NotificationReducer