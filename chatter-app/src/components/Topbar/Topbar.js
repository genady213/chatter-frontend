import React, { useState, useEffect } from "react"
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { useStateValue } from "../../StateProvider";
import axios from 'axios';

import {useRef} from 'react';
import apiClient from '../../apiClient';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

export function Topbar() {
  const [users, setUsers] = useState([])
  const searchQuery = useRef('');
  const [{ user }] = useStateValue()
  
  let navigate = useNavigate();
  const logOut = () => {
    apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];
    let path = `/`;
    navigate(path);
  };
    return (
      <div>
      <div className="topbar">
      <div className="left">
        <SettingsIcon />
        
                </div>
      <img className="logo" src="/chatterLogo.png" width="75" height="75"/>

      <div className="right">
      
        <AccountCircleIcon
          className="profileAvatar"
					alt={user?.displayName}
					src={user?.photoURL}
        />
        <div className="dropdown-content">
          <p type="submit"
          value="submit"
            onClick={logOut
            }>Logout</p>
          </div>
      </div>
      
            </div>
            <div className="searchSection">
            <div className="search">
                <input ref={searchQuery} type="text"  placeholder="Search" className="searchFields" />
            </div>
            <div className="dropdownsearch">
              {users.map((userid, username) => (
					username
					
				))}</div>

                <button className="searchButton"><SearchIcon /></button>
                </div>
      </div>

  );
}
