import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useStateValue } from '../../StateProvider';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';

import { Topbar } from '../../components/Topbar/Topbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Footer } from '../../components/Footer/Footer.js';

import Chat from '../../components/Middle/Chat';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function HomePage() {
    const [{ user }, dispatch] = useStateValue();
    let navigate = useNavigate();
  useEffect(() => {
    if(Cookies.get('token') == null || Cookies.get('token') == ''){
      let path = `/`;
      navigate(path);
    }}, []);
    return (
        <div className="app">
      {
        
        <>
          <Topbar />
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/conversation/:roomId" element={<Chat />}></Route>
              <Route
                path="/"
                element={<div className="app__main"></div>}
              ></Route>
            </Routes>

            {/*<Footer />*/}
          </div>
        </>
        //)
      }
    </div>
  );
}
