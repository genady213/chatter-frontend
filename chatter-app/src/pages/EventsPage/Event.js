import React from "react"
import "./Event.css"
import PlaceIcon from '@mui/icons-material/Place';

export function Event({ noEvents, conversationId, name, details, location, time, purpose }) {
	if (noEvents) return <div className="noEvent">All caught up! (No events to display)</div>

	return (
		<div className="event">
			<div className="event__name">
				{name}
			</div>
			<div className="event__details">
				{details}
			</div>	
			<div className="event__purpose">
				{purpose}
			</div>
			<div className="event__location">
				<PlaceIcon/>{location}
			</div>
			<div className="event__date">
			{new Date(time).toLocaleString()}
			</div>	
			
		</div>
	)
}
export default Event