import React, { useState } from 'react';
import '../../App.css';
import { useStateValue } from '../../StateProvider';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';

import { Topbar } from '../../components/Topbar/Topbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Footer } from '../../components/Footer/Footer.js';

import Chat from '../../components/Middle/Chat';
import { Routes, Route } from 'react-router-dom';

export function HomePage() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {
        //!user ? (
        //		<Login />
        //		) : (
        <>
          <Topbar />
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/room/:roomId" element={<Chat />}></Route>
              <Route
                path="/"
                element={<div className="app__main"></div>}
              ></Route>
            </Routes>

            <Footer />
          </div>
        </>
        //)
      }
    </div>
  );
}
