import React, { useState, useEffect, useEvent, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Chat.css"
import Message from "./Message"
import ChatInput from "./ChatInput"
import apiClient from "../../apiClient"
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Cookies from "js-cookie"
import axios from "axios"
import Pusher from 'pusher-js';
import { pusher } from "../../client"

export function Chat() {
	const { roomId } = useParams()
	const [roomDetails, setRoomDetails] = useState(null)
	const [roomMessages, setRoomMessages] = useState([])
	const [noMessages, setNoMessages] = useState(false)

	function pusherUpdate() {
	apiClient.get('/conversation/' + roomId
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response.data.messages);
			if (!roomMessages.length){setNoMessages(false)}
			setRoomMessages(response.data.messages);
	  }, (error) => {
		console.log(error);
	  });};
	  let navigate = useNavigate();
	  function deleteChannel() {
		apiClient.delete('/conversation/' + roomId
		  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
		  .then((response) => {
				console.log(response.data);
				let path = `/Home/`;
        		navigate(path);
		  }, (error) => {
			console.log(error);
		  });};
	
///////////////////////PUSHER

	pusher.connection.bind("connected", () => {
		console.log("Websocket Connected");
	});
	const channel = pusher.subscribe(Cookies.get('userid'));
createConversationBind(roomId);

channel.bind("user-event", function (data) {
	switch (data.eventType) {
		case "create-conversation":
			createConversationBind(data.conversationId);
			break;
	}
	console.log(data);
});

function createConversationBind(channelID) {
	const conversationChannel = pusher.subscribe(channelID);
	conversationChannel.bind("message", function (data) {
		console.log("New Message Recieved: " + JSON.stringify(data));
		pusherUpdate();
	}, conversationChannel.unbind());
	conversationChannel.bind("status", function (data) {
		console.log("New Status Received: " + JSON.stringify(data));
	});
};
////////////////////////	

	useEffect(() => {
	
		if (roomId) {
			const req = apiClient.get('/conversation/' + roomId
	, { headers: { "Authorization": `${Cookies.get('token')}` } })
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
		roomMessages.map(({ message, _id, timeSent, username}) => (
			<Message
				message={message}
				timestamp={timeSent}
				user={username}
				key={timeSent}
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
						<DeleteOutlineIcon className="DeleteChannel"
						onClick={deleteChannel}/>
					</h4>
				</div>
				<div className="chat_headerRight">
					<p>
						<InfoOutlinedIcon /> Details
					</p>
				</div>
			</div>
			<div className="chat_messages">{chatMessages}</div>
			<div className="chat_inputBackground">hi</div>
			<ChatInput channelName={roomDetails?.name} channelId={roomId} />
		</div>
	)
}
export default Chat
