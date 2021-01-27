const NotificationReducer = (state = [], action) => {
  console.log('action.type :>> ', action.type)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export default NotificationReducer
