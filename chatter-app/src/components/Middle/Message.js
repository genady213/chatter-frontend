import React from "react"
import "./Message.css"
import FaceIcon from '@mui/icons-material/Face';

export function Message({ noMessages, message, timestamp, user, userImage }) {
	if (noMessages) return <div className="message">No messages...</div>

	return (
		<div className="message">
			<FaceIcon/>
			<div className="message__info">
				<h4>
					{user}
					<span className="message__timestamp">
						{new Date(timestamp).toLocaleString()}
					</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	)
}
export default Message