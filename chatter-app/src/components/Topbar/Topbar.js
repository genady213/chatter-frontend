import React from 'react';
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { useStateValue } from "../../StateProvider";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

export function Topbar() {

  const [{ user }] = useStateValue()
  
  let navigate = useNavigate();
  const logOut = () => {
  axios.defaults.headers.common['Authorization'] = '';
  delete axios.defaults.headers.common['Authorization'];
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
                <input type="text" placeholder="Search" />
            </div>
                <button className="searchButton"><SearchIcon /></button>
                </div>
      </div>

  );
}
