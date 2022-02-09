import React from "react"

const SearchField = ({ searchTerm, onChangeHandler }) => {
	return (
		<>
			find countries <input value={searchTerm} onChange={onChangeHandler} />
		</>
	)
}

export default SearchField
