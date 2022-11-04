import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Chat.css"
import Message from "./Message"
import ChatInput from "./ChatInput"
import apiClient from "../../apiClient"
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import Cookies from "js-cookie"
import axios from "axios"

export function Chat() {
	const { roomId } = useParams()
	const [roomDetails, setRoomDetails] = useState(null)
	const [roomMessages, setRoomMessages] = useState([])
	const [noMessages, setNoMessages] = useState(false)
	
	async function sendData() {
		var theans = "";
		const req = await apiClient.post('/conversation', {"name":"Test","users":[{"userId":Cookies.get('userid'),"username":"genady"},{"userId":"63630e8b73a6da95a6aae2f5","username":"genady2"}]}
		,{ headers: {"Authorization" : `${Cookies.get('token')}`} })
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
	  //console.log(Cookies.get('token')); 63631a6573a6da95a6aae327
	  //sendData();
	useEffect(() => {
	
		if (roomId) {
			const req = apiClient.get('/conversation/' + roomId
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response.data.messages);
			setRoomMessages(response.data.messages);
			setRoomDetails(response.data);
	  }, (error) => {
		console.log(error);
	  }); 

		}

		
	}, [roomId])

	useEffect(() => {
		if (!roomMessages.length) setNoMessages(true)
		else setNoMessages(false)
	}, [roomMessages])

	const chatMessages = noMessages ? (
		<Message noMessages={noMessages} />
	) : (
		roomMessages.map(({ message, timestamp, user }) => (
			<Message
				message={message}
				timestamp={timestamp}
				user={user}
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