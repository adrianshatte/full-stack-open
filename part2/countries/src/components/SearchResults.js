import React from "react"

const SearchResults = ({ searchResults, onClickHandler }) => {
	return (
		<div>
			{searchResults.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : (
				searchResults.map((country, i) => (
					<p key={country.name.common}>
						{country.name.common}
						<button type="button" data-idx={i} onClick={onClickHandler}>
							show
						</button>
					</p>
				))
			)}
		</div>
	)
}

export default SearchResults
