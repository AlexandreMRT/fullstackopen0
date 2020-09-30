const NotificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      state = `you created the anecdote ${action.data.content}`;
      return state

    case 'VOTE_ANECDOTE':
      state = `you voted for ${action.data.content}`;

      return state
    default:
      return state
  }
}

export default NotificationReducer