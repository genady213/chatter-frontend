import React, { useState, useEffect, useCallback, setData } from "react"
import Popup from 'reactjs-popup';
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import CommentIcon from '@mui/icons-material/Comment';
import { useStateValue } from "../../StateProvider";
import Cookies from "js-cookie";
import apiClient from "../../apiClient";
import TextField  from '@mui/material/TextField';


import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add"
import LoopIcon from "@material-ui/icons/Loop"

export function Sidebar() {


  const [{ user }] = useStateValue()
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState("")

	const fetchData = useCallback(async () => {
		const data = await apiClient.get('/user/' + Cookies.get('userid')
		, { headers: {"Authorization" : `${Cookies.get('token')}`} })
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

	useEffect(() => {
		if (!channels.length)
			setLoading(<SidebarOption Icon={LoopIcon} title="Loading..." />)
		else setLoading("")
	}, [channels])

  return (
	  <div className="sidebar">


		  {/*<SidebarOption Icon={CommentIcon} title="New Message"/>*/}

		  <Popup
			  trigger={<button className="button"> <CommentIcon/> New Message </button>}
			  modal
			  nested
		  >
			  {close => (
				  <div className="modal">
					  <button className="close" onClick={close}>
						  &times;
					  </button>
					  <div className="header"> Chatter someone up! </div>
					  <div className="textFieldArea">						  
						  <TextField className="textFields" label="Conversation Name" />
						  <TextField className="textFields" label="Who are you chatting with?" />
						  <div className="popupButtonArea">
							  <button className="popupButton">Start Chatting</button>
						  </div>
					  </div>
				  </div>
			  )}
			  </Popup>

		  <hr />

			
			{loading ||
				channels.map((channel) => (
					<SidebarOption
						key={channel.conversationID}
						title={channel.conversationName}
						id={channel._id}
					/>
					
				))}

		</div>	
  );
}
