import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NotificationReducer from './reducers/NotificationReducer'
import BlogsReducer from './reducers/BlogsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import UserReducer from './reducers/UserReducer'

const reducer = combineReducers({
  notifications: NotificationReducer,
  blogs: BlogsReducer,
  user: UserReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store