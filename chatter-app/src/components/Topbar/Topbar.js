import React from 'react';
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export function Topbar() {
  return (
    <div className="topbar">
      <div className="left">
        <SettingsIcon />
      </div>
      <div className="search">
        <SearchIcon />
        <input placeholder="Search for contacts" />
      </div>
      <div className="right">
        <AccountCircleIcon
          className="profileAvatar"
          //alt={user?.displayname}
          //src={user?.photoURL}
          alt={'Genady Andriasian'}
          src={''}
        />
      </div>
    </div>
  );
}
