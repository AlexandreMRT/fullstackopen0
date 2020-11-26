import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import { useField } from '../hooks/index';

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const withoutReset = (({ reset, ...rest }) => rest)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...withoutReset(content)} />
        </div>
        <div>
          author
          <input {...withoutReset(author)} />
        </div>
        <div>
          url for more info
          <input {...withoutReset(info)} />
        </div>

        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew;