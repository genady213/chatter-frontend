import React, { useState } from "react"
import { useStateValue } from "../../StateProvider";
import Cookies from "js-cookie";
import apiClient from "../../apiClient";

export function ChatInput({ channelName, channelId }) {
	const [input, setInput] = useState("")
	const [{ user }] = useStateValue()

	const sendMessage = (e) => {
		e.preventDefault()

		if (!input) return false

		if (channelId) {
			const req = apiClient.put('/conversation/' + channelId, 
			{"userId":Cookies.get('userid'),"message":input}
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response);
	  }, (error) => {
		console.log(error);
	  });}

		setInput("")
	}

	return (
		<div className="chatInput">
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message #${channelName}`}
				/>
				<button type="submit" onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	)
}
export default ChatInput