import React from "react"

const Notification = ({ message, notifyClass }) => {
	if (message === null) {
		return null
	}

	return <div className={notifyClass}>{message}</div>
}

export default Notification
