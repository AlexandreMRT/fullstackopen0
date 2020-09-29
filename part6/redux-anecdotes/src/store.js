import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import AnecdoteReducer from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdotes: AnecdoteReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store