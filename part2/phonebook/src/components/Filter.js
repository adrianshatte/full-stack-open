import React from "react"

const Filter = ({ searchTerm, onChangeHandler }) => {
	return (
		<div>
			filter shown with a
			<input value={searchTerm} onChange={onChangeHandler} />
		</div>
	)
}

export default Filter
