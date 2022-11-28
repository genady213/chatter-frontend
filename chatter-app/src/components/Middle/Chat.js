import React, { useState, useEffect, useEvent, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Chat.css"
import Message from "./Message"
import Popup from 'reactjs-popup';
import ChatInput from "./ChatInput"
import apiClient from "../../apiClient"
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventIcon from '@mui/icons-material/Event';
import TextField from '@mui/material/TextField';
import Cookies from "js-cookie"
import axios from "axios"
import Pusher from 'pusher-js';
import { pusher } from "../../client"

export var eventObj;

export function setEventObj(eventObject){
	eventObj = eventObject;
}

export function Chat() {
	const { roomId } = useParams()
	const [roomDetails, setRoomDetails] = useState(null)
	const [roomMessages, setRoomMessages] = useState([])
	const [roomUsers, setRoomUsers] = useState([])
	const [noMessages, setNoMessages] = useState(false)

	const [theEventObject, setTheEventObject] = useState(null)
	
	const [open, setOpen] = useState(false);  
	const closeModal = () => {
		setOpen(false)
		setEve();
		setLoc();
		setDet();
		setPur();
		setTim();
		setTheEventObject()
		setEventObj()
	};
	const eventName = useRef();
	const location = useRef();
	const details = useRef();
	const purpose = useRef();
	const time = useRef();

	
	const [eve, setEve] = useState('');
	const [loc, setLoc] = useState('');
	const [det, setDet] = useState('');
	const [pur, setPur] = useState('');
	const [tim, setTim] = useState('');

	const handleChange1 = event => {
		setEve(event.target.value);
	  };
	const handleChange2 = event => {
		setLoc(event.target.value);
	  };
	  const handleChange3 = event => {
		setDet(event.target.value);
	  };
	  const handleChange4 = event => {
		setPur(event.target.value);
	  };
	  const handleChange5 = event => {
		setTim(event.target.value);
	  };

	  

	useEffect(() => {
		console.log("eventObj");
		console.log(theEventObject);
		if(theEventObject){
			setOpen(o => !o);
			if(eventObj.name){
				setEve(eventObj.name);
			}
			if(eventObj.location){
				setLoc(eventObj.location);
			}
			if(eventObj.details){
				setDet(eventObj.details);
			}
			if(eventObj.purpose){
				setPur(eventObj.purpose);
			}
			if(eventObj.datetime){
				setTim(eventObj.datetime);
			}
		}
		
	}, [theEventObject])

	const scrollToBottom = (id) => {
		const element = document.getElementById(id);
		element.scrollTop = element.scrollHeight;
	}

	function pusherUpdate() {
	apiClient.get('/conversation/' + roomId
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response.data.messages);
			if (!roomMessages.length){setNoMessages(false)}
			setRoomMessages(response.data.messages);
			scrollToBottom("chatScrollComponent");
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
/*
channel.bind("user-event", function (data) {
    switch (data.eventType) {
        case "create-conversation":
            createConversationBind(data.conversationId);
            break;
    }
    console.log(data);
});
*/
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
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response.data.messages);
			setRoomMessages(response.data.messages);
			setRoomDetails(response.data);
			setRoomUsers(response.data.users);
			scrollToBottom("chatScrollComponent");
	  }, (error) => {
		console.log(error);
	  }); 

		}

		
	}, [roomId])

	useEffect(() => {
		if (!roomMessages.length) setNoMessages(true)
		else setNoMessages(false)
		
		setTheEventObject(eventObj)
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

	const roomUse = (
		roomUsers.map(({ username}) => (
			<div>{username}</div>
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
				
				<button className="EventCreate" onClick={() => setOpen(o => !o)}> <p>
				<EventIcon /> New 
			</p> </button>
				<Popup open={open} closeOnDocumentClick onClose={closeModal}>
				
					<div className="eventmodal">
						<a className="close3" onClick={closeModal}>
							&times;
						</a>
						<div className="EventTop"> Make New Event</div>
						<div className="EventtextFieldArea">
							<TextField className="textFields" label="Event Name" onChange={handleChange1} value={eve} inputRef={eventName} />
							<TextField className="textFields" label="Event Location" onChange={handleChange2} value={loc} inputRef={location} />

							<TextField className="textFields" label="Event Details" onChange={handleChange3} value={det} inputRef={details} />
							<TextField className="textFields" label="Event Purpose" onChange={handleChange4} value={pur} inputRef={purpose} />

							<TextField className="textFields" label="When" onChange={handleChange5} value={tim} inputRef={time} />
							<div id = "errorEvent" className="error-event">Event Create Failed!</div>
							<div className="popupButtonArea">
								<button className="popupButton"
								onClick={async() => {
										console.log(location.current.value);
										const redirectSuccess = '';//await sendData2(convoName.current.value);
												if(redirectSuccess == "Conversation Created"){    
													closeModal();
												  }else{
													document.getElementById("errorEvent").style.visibility = 'visible';
												  } 
									}}
								>Create Event!</button>
							</div>
						</div>
					</div>
				
			</Popup>

				<Popup
				trigger={<button className="chat_headerRight"> <p>
				<InfoOutlinedIcon /> Details
			</p> </button>}
				modal
				nested
			>
				{close => (
					<div className="modal2">
						<button className="close2" onClick={close}>
							&times;
						</button>
						<div className="channelDetails"> {roomDetails?.name}</div>
						<div className="roomMemberDetails"> Room Members:</div>
						<div className="roomUsers">{roomUse}</div>
						<div className="roomEventDetails"> Room Events:</div>
						<div className="roomEvents">{}</div>
					</div>
				)}
			</Popup>
				
			</div>
			<div id="chatScrollComponent" className="chatMessageContainer">
			<div className="chat_messages">{chatMessages}</div>
			<ChatInput channelName={roomDetails?.name} channelId={roomId} />
			</div>
		</div>
	)
}
export default Chat
