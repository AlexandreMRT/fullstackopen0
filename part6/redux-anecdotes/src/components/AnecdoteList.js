import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      {anecdote.content}
      <br />
      has {anecdote.votes}
      <button onClick={handleClick} >vote</button>
    </div>
  )
}

const Anecdotes = (props) => {
  // const dispatch = useDispatch()

  // const anecdotes = useSelector(state => {
  //   if ( state.filter === '' ) {
  //     return state.anecdotes
  //   } else {
  //     return (state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
  //   }
  // })

  // const voteFor = async (anecdote) => {
  //   dispatch(voteForAnecdote(anecdote))
  //   dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  // }

  // MEIO TERMO
  // const anecdotes = () => {
  //   if ( props.filter === '' ) {
  //     return props.anecdotes
  //   } else {
  //     return (props.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(props.filter.toUpperCase())))
  //   }
  // }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={ () => {
              props.voteForAnecdote(anecdote)
              props.setNotification(`you voted '${anecdote.content}'`, 3)
            }
          }
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: (state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
    }
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes