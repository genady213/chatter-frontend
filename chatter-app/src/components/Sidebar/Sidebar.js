import React, { useState, useEffect } from "react"
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import CommentIcon from '@mui/icons-material/Comment';
import { useStateValue } from "../../StateProvider";
//import db from "database";


import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add"
import LoopIcon from "@material-ui/icons/Loop"

export function Sidebar() {

  const [{ user }] = useStateValue()
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState("")

	useEffect(() => {/*
		db.collection("rooms").onSnapshot((snapshot) => {
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
				}))
			)
		})
	*/}, [])

	useEffect(() => {
		if (!channels.length)
			setLoading(<SidebarOption Icon={LoopIcon} title="Loading..." />)
		else setLoading("")
	}, [channels])

  return (
<div className="sidebar">
			
		<SidebarOption Icon={CommentIcon} title="New Message" /> 
      		<hr />

			
			{loading ||
				channels.map((channel) => (
					<SidebarOption
						key={channel.id}
						title={channel.name}
						id={channel.id}
					/>
					
				))}
		</div>
  );
}
