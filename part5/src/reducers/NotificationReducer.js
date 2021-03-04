//action creators

export const setNotification = (content, type, time) => {
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      data: { content, type }
    })
    setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIFICATION
      })
    }, time * 1000)
  }
}

//action types
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

//selectors
export const getNotification = (state) => state.notifications

const NotificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default NotificationReducer