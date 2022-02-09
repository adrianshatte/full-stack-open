import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchField from "./components/SearchField"
import SearchResults from "./components/SearchResults"
import CountryDetails from "./components/CountryDetails"
import WeatherDetails from "./components/WeatherDetails"

const App = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [countries, setCountries] = useState([])
	const [weather, setWeather] = useState({
		main: { temp: 0 },
		wind: { speed: 0, deg: 0 },
	})

	useEffect(() => {
		axios //
			.get("https://restcountries.com/v3.1/all")
			.then((response) => {
				setCountries(response.data.map((country) => country))
			})
	}, [])

	const onSearchChange = (event) => {
		setSearchTerm(event.target.value)
		if (countriesToShow.length === 1) {
			showWeather()
		}
	}

	const showCountry = (event) => {
		const index = parseInt(event.target.getAttribute("data-idx"))

		setSearchTerm(countriesToShow[index].name.common)

		showWeather()
	}

	const showWeather = () => {
		const api_key = process.env.REACT_APP_API_KEY

		const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${countriesToShow[0].latlng[0]}&lon=${countriesToShow[0].latlng[1]}&units=metric&appid=${api_key}`

		axios.get(api_url).then((response) => {
			setWeather(response.data)
		})
	}

	const countriesToShow =
		searchTerm.length > 0
			? countries.filter((country) =>
					country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: countries

	return (
		<div>
			<SearchField searchTerm={searchTerm} onChangeHandler={onSearchChange} />
			<SearchResults
				searchResults={countriesToShow}
				onClickHandler={showCountry}
			/>
			<div>
				{countriesToShow.length === 1 ? ( //
					<>
						<CountryDetails countryToDisplay={countriesToShow[0]} />
						<WeatherDetails
							capitalCity={countriesToShow[0].capital[0]}
							weather={weather}
						/>
					</>
				) : (
					<p></p>
				)}
			</div>
		</div>
	)
}

export default App
