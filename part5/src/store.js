import { createStore } from 'redux'

import NotificationReducer from './reducers/NotificationReducer'

const store = createStore(NotificationReducer)

export default store