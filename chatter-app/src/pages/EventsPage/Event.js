import React from "react"
import "./Event.css"

export function Event({ noEvents, message, timestamp, user, userImage }) {
	if (noEvents) return <div className="noEvent">All caught up! (No events to display)</div>

	return (
		<div className="event">
			<div className="event__info">
				<h4>
					{user}
					<span className="event__timestamp">
						{new Date(timestamp).toLocaleString()}
					</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	)
}
export default Event