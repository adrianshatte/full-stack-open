import React from "react"

const WeatherDetails = ({ capitalCity, weather }) => {
	return (
		<>
			<h2>weather in {capitalCity}</h2>
			<p>
				<strong>temperature: </strong> {weather.main.temp} Celcius
			</p>
			<p>
				<strong>wind:</strong> {weather.wind.speed} km/h, {weather.wind.deg}{" "}
				degrees
			</p>
		</>
	)
}

export default WeatherDetails
