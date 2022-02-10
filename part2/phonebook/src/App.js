import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personsService from "./services/phone-numbers.js"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationClass, setNotificationClass] = useState("success")

	useEffect(() => {
		personsService.getAll().then((initialPersons) => {
			setPersons(initialPersons)
		})
	}, [])

	const addNewRecord = (event) => {
		event.preventDefault()

		const newPersonObj = {
			name: newName,
			number: newNumber,
		}

		if (persons.map((person) => person.name).includes(newName)) {
			const confirm = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			)
			if (confirm) {
				const id = persons.find((person) => person.name === newName).id
				personsService
					.update(id, newPersonObj)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : returnedPerson
							)
						)
						setNotificationMessage(`Updated ${returnedPerson.name}`)
						setNotificationClass("success")
						setTimeout(() => {
							setNotificationMessage(null)
						}, 3000)
					})
					.catch((error) => {
						setNotificationMessage(
							`Information about ${newName} is already removed from the server`
						)
						setNotificationClass("error")
						setTimeout(() => {
							setNotificationMessage(null)
						}, 3000)
					})
			}
		} else {
			personsService.create(newPersonObj).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
				setNewName("")
				setNewNumber("")
				setNotificationMessage(`Added ${returnedPerson.name}`)
				setNotificationClass("success")
				setTimeout(() => {
					setNotificationMessage(null)
				}, 3000)
			})
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

	const deletePerson = (event) => {
		const name = event.target.getAttribute("data-name")

		const confirm = window.confirm(`Delete ${name}?`)
		if (confirm) {
			const id = persons.find((person) => person.name === name).id
			personsService.deleteRecord(id).then((deletedPerson) => {
				setPersons(persons.filter((person) => person.id !== id))
			})
		}
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
			<Notification
				message={notificationMessage}
				notifyClass={notificationClass}
			/>
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
			<Persons people={peopleToShow} deleteHandler={deletePerson} />
		</div>
	)
}

export default App
