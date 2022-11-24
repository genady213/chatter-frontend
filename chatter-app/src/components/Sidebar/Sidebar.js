import React, { useState, useEffect, useCallback, setData, useRef } from "react"
import Popup from 'reactjs-popup';
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import CommentIcon from '@mui/icons-material/Comment';
import { useStateValue } from "../../StateProvider";
import Cookies from "js-cookie";
import apiClient from "../../apiClient";
import client from "../../client";
import TextField from '@mui/material/TextField';
import {
	BrowserRouter as Router,
	useNavigate,
	useParams
  } from 'react-router-dom';
import { pusher } from "../../client";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add"
import LoopIcon from "@material-ui/icons/Loop"


var redirect = "";

export function Sidebar() {
	const convoName = useRef();
	const userToChat = useRef();
	let navigate = useNavigate();
	const routeChange = () => {
        let path = `/Home/conversation/` + redirect;
        navigate(path);
        //window.location.reload(true);
      };
        
	const [{ user }] = useStateValue()
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState("")

	const fetchData = useCallback(async () => {
		const data = await apiClient.get('/user/' + Cookies.get('userid')
			, { headers: { "Authorization": `${Cookies.get('token')}` } })
			.then((response) => {
				console.log(response.data.conversations);
				setChannels(response.data.conversations);
			}, (error) => {
				console.log(error);
			});

	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	async function sendData(convo, user) {
		var theans = "";
		var firstuserid = "";
		var firstuser = "";
		const request = await apiClient
      .get('/user/search/' + user, {
        headers: { Authorization: `${Cookies.get('token')}` },
      })
      .then(
        (response) => {
			console.log(response);
			firstuser = response.data[0].username;
			firstuserid = response.data[0]._id;
        },
        (error) => {
          console.log(error);
        }
      )
		const req = await apiClient.post('/conversation', {"name":convo,"users":[{"userId":Cookies.get('userid'),"username":Cookies.get('username')},{"userId":firstuserid,"username":firstuser}]}
		,{ headers: {"Authorization" : `${Cookies.get('token')}`} })
		.then((response) => {
		  console.log(response);
		  theans = response.data.message;
		  redirect = response.data.conversationId;
			fetchData()
		return theans;
		}, (error) => {
		  console.log(error);
		});
		return theans;
	}

	useEffect(() => {
		if (!channels.length)
			setLoading(<SidebarOption Icon={LoopIcon} title="Loading..." />)
		else setLoading("")
	}, [channels])

	return (
		<div className="sidebar">


			{/*<SidebarOption Icon={CommentIcon} title="New Message"/>*/}

			<Popup
				trigger={<button className="button"> <CommentIcon /> New Message </button>}
				modal
				nested
			>
				{close => (
					<div className="modal">
						<button className="close" onClick={close}>
							&times;
						</button>
						<div className="popupheader"> Chatter someone up! </div>
						<div className="textFieldArea">
							<TextField className="textFields" label="Conversation Name" inputRef={convoName} />
							<TextField className="textFields" label="Who are you chatting with?" inputRef={userToChat} />
							<div id="error" className="error-user">Conversation Create Failed</div>
							<div className="popupButtonArea">
								<button className="popupButton"
									onClick={async() => {
									const redirectSuccess = await sendData(convoName.current.value,userToChat.current.value);
									if(redirectSuccess == "Conversation Created"){      
									   routeChange();
									   close();
									  }else{
										document.getElementById("error").style.visibility = 'visible';
									  }              
									}}
								>Start Chatting</button>
							</div>
						</div>
					</div>
				)}
			</Popup>

			{/*<hr />*/}


			{loading ||
				channels.map((channel) => (
					<SidebarOption
						keys={channel.conversationID}
						title={channel.conversationName}
						id={channel._id}
					/>

				))}

		</div>
	);
}
