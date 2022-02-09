import React from "react"

const CountryDetails = ({ countryToDisplay }) => {
	return (
		<>
			<h1>{countryToDisplay.name.common}</h1>
			<p>
				capital {countryToDisplay.capital[0]}
				<br />
				population {countryToDisplay.population}
			</p>
			<h2>languages</h2>
			<ul>
				{Object.values(countryToDisplay.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				alt={countryToDisplay.name.common}
				src={countryToDisplay.flags.png}
			/>
		</>
	)
}

export default CountryDetails
