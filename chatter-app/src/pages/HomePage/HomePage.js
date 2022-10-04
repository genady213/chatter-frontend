import React, { useState } from "react"
import '../../App.css';
import { useStateValue } from "../../StateProvider";
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import { Topbar } from '../../components/Topbar/Topbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';

import Login from "../LoginPage/LoginPage"
import Chat from "../../components/Middle/Chat"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export function HomePage() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
			<Router>
				{//!user ? (
			//		<Login />
		//		) : (
					<>
						<Topbar />
						<div className="app__body">
							<Sidebar />
							<Routes>
								<Route path="/room/:roomId" element={<Chat />}>
									
								</Route>
								<Route path="/" element={<div className="app__main">
										
									</div>}>
									
								</Route>
							</Routes>
						</div>
					</>
				//)
        }
			</Router>
		</div>
	);
}
