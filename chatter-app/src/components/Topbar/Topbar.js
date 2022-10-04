import React from 'react';
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { useStateValue } from "../../StateProvider";


export function Topbar() {

  const [{ user }] = useStateValue()
  
  return (
    <div className="topbar">
      <div className="left">
        <SettingsIcon />
        
      </div>
      <div className="search">
        <SearchIcon />
        
        <input type="text" placeholder="Search for contacts" />
      </div>
      <div className="right">
        <AccountCircleIcon
          className="profileAvatar"
					alt={user?.displayName}
					src={user?.photoURL}
        />
      </div>
    </div>
  );
}
