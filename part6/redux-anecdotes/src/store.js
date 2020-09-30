import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: AnecdoteReducer,
  notifications: NotificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store