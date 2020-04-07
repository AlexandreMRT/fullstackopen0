import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodVote = () => {
    return (
      setGood(good + 1)
    )
  }
  
  const handleNeutralVote = () => {
    return (
      setNeutral(neutral + 1)
    )
  }
  
  const handleBadVote = () => {
    return (
      setBad(bad + 1)
    )
  }

  const Statistics = ({ text, value }) => {
    return (
      <div>
        {text} {value}
      </div>
    )
  }

  const Button = ({ text , onClick}) => {
    return (
      <button onClick={onClick}>{ text }</button>
    )
  }

  const Title = ( { text }) => (<h1>{ text }</h1>)


  return (
    <div>
      <Title text='Give Feedback'/>
      <Button onClick={handleGoodVote} text='Good' />
      <Button onClick={handleNeutralVote} text='Neutral' />
      <Button onClick={handleBadVote} text='Bad' />
      <Title text='Statistics' />
      <Statistics text='Good' value={good} />
      <Statistics text='Neutral' value={neutral} />
      <Statistics text='Bad' value={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);