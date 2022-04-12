import { useState } from 'react'

const Heading = ({text}) => (
  <h1>{text}</h1>
)

const AnecdoteInfo = ({anecdote, point}) => (
  <div>
    {anecdote}
    <br />
    has {point} {point === 1 ? "vote" : "votes"}
  </div>
)

const PopularAnecdote = ({anecdotes, points, popular}) => {
  if (isNaN(popular)) {
    return <div />
  }

  return (
    <div>
      <Heading text="Anecdote with most votes" />
      <AnecdoteInfo anecdote={anecdotes[popular]} point={points[popular]} />
    </div>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  // return a random integer between 0 and anecdotes.length - 1
  const getRandom = () => Math.floor(Math.random() * anecdotes.length)
  // same as above except x is excluded from the pool
  const getRandomExcept = (x) => {
    const n = getRandom()
    return n === x ? getRandomExcept(x) : n
  }
 
  const [selected, setSelected] = useState(getRandom())
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  // keep track of the index of the anecdote with the most votes
  // if multiple anecdotes are tied for the first place, the one with the smallest
  // index is regerded most popular
  const [popular, setPopular] = useState(NaN)

  // find the index of the maximum value of an array
  // in case of multiple occurence of the maximum value, return the index of the first one
  const argmax = (array) => array.indexOf(Math.max(...array))

  const pickNewAnecdote = () => setSelected(getRandomExcept(selected))

  const castVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    setPopular(argmax(newPoints))

    // debugging
    console.log(newPoints)
    console.log(popular)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <AnecdoteInfo anecdote={anecdotes[selected]} point={points[selected]} />
      <Button text="vote" handleClick={castVote} />
      <Button text="next anecdote" handleClick={pickNewAnecdote} />

      <PopularAnecdote anecdotes={anecdotes} points={points} popular={popular} />
    </div>
  )
}

export default App
