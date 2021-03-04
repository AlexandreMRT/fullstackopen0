import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.addAnecdote(content);
    props.setNotification(`new anecdote '${content}'`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, { addAnecdote, setNotification })(AnecdoteForm);
