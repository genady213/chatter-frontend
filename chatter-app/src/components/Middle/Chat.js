import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Chat.css"
import Message from "./Message"
import ChatInput from "./ChatInput"
import apiClient from "../../apiClient"

import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"

export function Chat() {
	const { roomId } = useParams()
	const [roomDetails, setRoomDetails] = useState(null)
	const [roomMessages, setRoomMessages] = useState([])
	const [noMessages, setNoMessages] = useState(false)
	
	async function sendData() {
		var theans = "";
		const req = await apiClient.post('/conversation', {"name":"BackendGang","users":[{"userId":"someId","username":"jdoe"}]})
		.then((response) => {
		  console.log(response);
		  theans = response.data.message;
		return theans;
		}, (error) => {
		  console.log(error);
		});
		return theans;
	  }
	  //roomId = sendData();
	  apiClient.get('/conversation/' + roomId)
	useEffect(() => {
	
		if (roomId) {
			
		}

		
	}, [roomId])

	useEffect(() => {
		if (!roomMessages.length) setNoMessages(true)
		else setNoMessages(false)
	}, [roomMessages])

	const chatMessages = noMessages ? (
		<Message noMessages={noMessages} />
	) : (
		roomMessages.map(({ message, timestamp, user, userImage }) => (
			<Message
				message={message}
				timestamp={timestamp}
				user={user}
				userImage={userImage}
				key={timestamp}
			/>
		))
	)

	return (
		<div className="chat">
			<div className="chat_header">
				<div className="chat_headerLeft">
					<h4 className="chat_channelName">
						<span># {roomDetails?.name}</span>
						<StarBorderOutlineIcon />
					</h4>
				</div>
				<div className="chat_headerRight">
					<p>
						<InfoOutlinedIcon /> Details
					</p>
				</div>
			</div>
			<div className="chat_messages">{chatMessages}</div>
			<ChatInput channelName={roomDetails?.name} channelId={roomId} />
		</div>
	)
}
export default Chat