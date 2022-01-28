import React, { useState } from "react"

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	]

	const [randomQuote, setRandomQuote] = useState({
		anecdote: anecdotes[0],
		index: 0,
	})
	const [votes, updateVotes] = useState(Array(anecdotes.length).fill(0))

	const clickRandomQuote = () => {
		const idx = Math.floor(Math.random() * anecdotes.length)
		setRandomQuote({ anecdote: anecdotes[idx], index: idx })
	}

	const clickVote = () => {
		const copy = [...votes]
		copy[randomQuote.index] += 1
		updateVotes(copy)
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{randomQuote.anecdote} <br />
			has {votes[randomQuote.index]} votes
			<br />
			<button onClick={clickVote}>vote</button>
			<button onClick={clickRandomQuote}>next anecdote</button>
			<h1>Anecdote with the most votes</h1>
			{anecdotes[votes.indexOf(Math.max(...votes))]} <br />
			has {votes[votes.indexOf(Math.max(...votes))]} votes
		</div>
	)
}

export default App
