import userService from '../services/users'

//action creators
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: INIT_USERS,
      data: users,
    })
  }
}

//action types
export const INIT_USERS = 'INIT_USERS'

//selectors
export const getUsers = (state) => state.users

const UserReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default UserReducer