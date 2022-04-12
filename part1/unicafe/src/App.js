import { useState } from 'react'

const Heading = ({text}) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, allClicks}) => {
  if (allClicks == 0) {
    return (
      <div>
        <p>No feedback given</p>    
      </div>
    )
  }

  const average = (good + bad) / allClicks
  const positive = `${good / allClicks * 100} %`

  return (
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" handleClick={incrementGood} />
      <Button text="neutral" handleClick={incrementNeutral} />
      <Button text="bad" handleClick={incrementBad} />

      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

export default App
