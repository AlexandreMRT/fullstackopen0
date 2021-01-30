import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NotificationReducer from './reducers/NotificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notifications: NotificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store