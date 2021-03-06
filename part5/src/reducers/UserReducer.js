//action creators

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: SET_USER,
      data: user
    })
  }
}

export const userLogOut = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_USER
    })
  }
}

//action types
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

//selectors
export const getUser = (state) => state.user

const UserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export default UserReducer