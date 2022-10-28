import React from 'react';
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { useStateValue } from "../../StateProvider";


export function Topbar() {

  const [{ user }] = useStateValue()
  
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
