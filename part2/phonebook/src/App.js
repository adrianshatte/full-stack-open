import React, { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		axios //
			.get("http://localhost:3001/persons")
			.then((response) => {
				setPersons(response.data)
			})
	}, [])

	const addNewRecord = (event) => {
		event.preventDefault()

		if (persons.map((person) => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const newPersonObj = {
				name: newName,
				number: newNumber,
			}

			setPersons(persons.concat(newPersonObj))

			setNewName("")
			setNewNumber("")
		}
	}

	const handleNameInput = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberInput = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearch = (event) => {
		setSearchTerm(event.target.value)
	}

	const peopleToShow =
		searchTerm.length > 0
			? persons.filter((person) =>
					person.name.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchTerm={searchTerm} onChangeHandler={handleSearch} />
			<h3>add a new</h3>
			<PersonForm
				onSubmitHandler={addNewRecord}
				newName={newName}
				nameHandler={handleNameInput}
				newNumber={newNumber}
				numberHandler={handleNumberInput}
			/>
			<h2>Numbers</h2>
			<Persons people={peopleToShow} />
		</div>
	)
}

export default App
