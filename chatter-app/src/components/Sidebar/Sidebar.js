import React, {  useEffect, useCallback, setData, useRef } from "react"
import useState from 'react-usestateref'
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
	const userToChat2 = useRef();
	const userToChat3 = useRef();
	const userToChat4 = useRef();
	var channelCreator = false;

	let navigate = useNavigate();
	const routeChange = () => {
        let path = `/Home/conversation/` + redirect;
        navigate(path);
        //window.location.reload(true);
      };
	  var count = 0;
	  const unhide = () => {	  
        
		if(count == 2){
			document.getElementById("Fields4").style.display = "block";
			document.getElementById("addMoreUsers").style.display = "none";
			count++;
		}
		if(count == 1){
			document.getElementById("Fields3").style.display = "block";
			count++;
		}
		if(count == 0){
			document.getElementById("Fields2").style.display = "block";
			count++;
		}
      };
	
	const [{ user }] = useStateValue()
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState("")
	const [thenewusers, setThenewusers, thenewusersRef] = useState([])

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


	async function sendData(user, user2, user3, user4) {
		var firstuserid = "";
		var firstuser = "";
		var seconduserid = "";
		var seconduser = "";
		var thirduserid = "";
		var thirduser = "";
		var fourthuserid = "";
		var fourthuser = "";
		setThenewusers([{"userId":Cookies.get('userid'),"username":Cookies.get('username')}]);
		if(user != ""){
		const request = await apiClient
      .get('/user/search/' + user, {
        headers: { Authorization: `${Cookies.get('token')}` }
      })
      .then(
        (response) => {
			console.log(response);
			firstuser = response.data[0].username;
			firstuserid = response.data[0]._id;
			setThenewusers(oldArray => [...oldArray, {"userId":firstuserid,"username":firstuser}]);
			return firstuser;
        },
        (error) => {
          console.log(error);
        }
      )}
	  if(user2 != ""){const request2 = await apiClient
		.get('/user/search/' + user2, {
		  headers: { Authorization: `${Cookies.get('token')}` },
		})
		.then(
		  (response) => {
			  console.log(response);
			  seconduser = response.data[0].username;
			  seconduserid = response.data[0]._id;
			  setThenewusers(oldArray => [...oldArray, {"userId":seconduserid,"username":seconduser}]);
		  },
		  (error) => {
			console.log(error);
		  }
		)}
	  
		if(user3 != ""){const request3 = await apiClient
      .get('/user/search/' + user3, {
        headers: { Authorization: `${Cookies.get('token')}` },
      })
      .then(
        (response) => {
			console.log(response);
			thirduser = response.data[0].username;
			thirduserid = response.data[0]._id;
			setThenewusers(oldArray => [...oldArray, {"userId":thirduserid,"username":thirduser}]);
        },
        (error) => {
          console.log(error);
        }
      )}
	  if(user4 != ""){
	  const request4 = await apiClient
      .get('/user/search/' + user4, {
        headers: { Authorization: `${Cookies.get('token')}` },
      })
      .then(
        (response) => {
			console.log(response);
			fourthuser = response.data[0].username;
			fourthuserid = response.data[0]._id;
			setThenewusers(oldArray => [...oldArray, {"userId":fourthuserid,"username":fourthuser}]);
        },
        (error) => {
          console.log(error);
        }
      )}
	  return firstuser;}


	  async function sendData2(convo){
		var theans = "";
		const req = await apiClient.post('/conversation', {"name":convo,"users":thenewusersRef.current}
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
					<div className="modal" onLoad={count = 0}>
						<button className="close" onClick={close}>
							&times;
						</button>
						<div className="popupheader"> Chatter someone up! </div>
						<div className="textFieldArea">
							<TextField className="textFields" label="Conversation Name" inputRef={convoName} />
							<TextField className="textFields" label="Who are you chatting with?" inputRef={userToChat} />
							<div id="Fields2" className="textFields2div">
								<TextField className="textFields2" label="Who are you chatting with?" inputRef={userToChat2} />
							</div>
							<div id="Fields3" className="textFields3div">
							<TextField className="textFields3" label="Who are you chatting with?" inputRef={userToChat3} />
							</div>
							<div id="Fields4" className="textFields4div">
							<TextField className="textFields4" label="Who are you chatting with?" inputRef={userToChat4} />
							</div>
							<br></br><AddIcon id="addMoreUsers" className="addUserIcon" onClick = {unhide}/>
							<div id = "error" className="error-user">Conversation Create Failed</div>
							<div className="popupButtonArea">
								<button className="popupButton"
								onClick={async() => {
									const redirectSuccess1 = await sendData(userToChat.current.value,userToChat2.current.value,userToChat3.current.value,userToChat4.current.value);
									console.log(thenewusersRef.current)
									
									if(redirectSuccess1 != ""){
										const redirectSuccess = await sendData2(convoName.current.value);
												if(redirectSuccess == "Conversation Created"){      
												   routeChange(); 
												   close();
												  }else{
													document.getElementById("error").style.visibility = 'visible';
												  } 
									  channelCreator = false;
									}}}
								>Start Chatting</button>
							</div>
						</div>
					</div>
				)}
			</Popup>



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
