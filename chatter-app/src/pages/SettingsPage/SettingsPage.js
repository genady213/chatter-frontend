import React from 'react';
import Cookies from "js-cookie";
import apiClient from "../../apiClient";
import { useState,useEffect } from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './SettingsPage.css';

export function SettingsPage() {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

 const [username, setUsername] = useState("")
 const [userID, setUserID] = useState("")

  const getCurrentUser = async () => {
    const data = await apiClient.get('/user/' + Cookies.get('userid')
      , { headers: { "Authorization": `${Cookies.get('token')}` } })
      .then((response) => {
        setUsername(response.data.username);
        setUserID(response.data._id)
      }) 
  }

  useEffect(() => {
    getCurrentUser();
  })

  return (
    <div class="settings-body-container">
      <div className="settings-top-container">
        <div
          className="arrow"
          onClick={() => {
            routeChange();
          }}
        >
          <ArrowBackIosIcon />
        </div>
        <div className="settings-title">
          <span>
            <img src="/chatterLogo.png" width="75" height="75" />
            <h1>Chatter</h1>
          </span>
        </div>
      </div>
      <div className="settingsinfo">
        <h2>General Profile Settings</h2>
        <hr />
        <div className="userInfo">
           
          <div className="col1">
            <h3>
              Username:
            </h3>
      <br/>
             <h3>
              User ID: 
            </h3>
            <br />
            <h3>
              Email: 
            </h3>
          </div>
          <div className="col2">
            <h3>{username}</h3>
            <br/>
            <h3>{userID}</h3>
            <br />
            <h3>N/A</h3>
              
          </div>
           
        </div>
<hr/>
      </div>
     
    </div>
  );
}
