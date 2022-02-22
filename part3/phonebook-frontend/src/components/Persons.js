import React from "react"

const Person = ({ name, number, deleteHandler }) => {
	return (
		<li>
			{name} {number}{" "}
			<button type="button" data-name={name} onClick={deleteHandler}>
				delete
			</button>
		</li>
	)
}

const Persons = ({ people, deleteHandler }) => {
	return (
		<ul>
			{people.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					deleteHandler={deleteHandler}
				/>
			))}
		</ul>
	)
}

export default Persons
