import React, { useState, useEffect } from 'react';
import './Topbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { useStateValue } from '../../StateProvider';
import Cookies from 'js-cookie';

import { useRef } from 'react';
import apiClient from '../../apiClient';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

export function Topbar() {
  const [users, setUsers] = useState([]);
  const searchQuery = useRef('');
  const [{ user }] = useStateValue();

  const [searchUser, setSearchUser] = useState('');

  const peoples = [
    'steve',
    'bill',
    'sally',
    'vincent',
    'genady',
    'chris',
    'ashwin',
    'varghese',
    'arnesh',
    'brian',
    'ryan',
    'ken',
  ];

  let navigate = useNavigate();
  const logOut = () => {
    apiClient.defaults.headers.common['Authorization'] = '';
    delete apiClient.defaults.headers.common['Authorization'];
    Cookies.set('token', '');
    Cookies.set('userid', '');
    let path = `/`;
    navigate(path);
  };

  //Value of the input is put into the current state. searchUser
  const onChange = (event) => {
    setSearchUser(event.target.value);
    //can have axios call here to check if that's a valid user
  };

  //When the user clicks the search button to look for that user
  const onSearch = (searchName) => {
    setSearchUser(searchName);
    console.log('searching for ', searchName);
    //axios call here to bring back data from that user and do whatever, i.e load a chat message with this individual
  };

  return (
    <div>
      <div className="topbar">
        <div className="left">
          <SettingsIcon />
        </div>
        <img className="logo" src="/chatterLogo.png" width="75" height="75" />

        <div className="right">
          <AccountCircleIcon
            className="profileAvatar"
            alt={user?.displayName}
            src={user?.photoURL}
          />
          <div className="dropdown-content">
            <p type="submit" value="submit" onClick={logOut}>
              Logout
            </p>
          </div>
        </div>
      </div>
      <div className="searchSection">
        <div className="search">
          <input
            /*ref={searchQuery} Can add back later*/
            type="text"
            value={searchUser}
            onChange={onChange}
            placeholder="Search"
            className="searchFields"
          />
          <div className="dropdownsearch">
            {/*{users.map((userid, username) => username)} */}
            {peoples
              .filter((person) => {
                const searchTerm = searchUser.toLowerCase();
                const userName = person.toLowerCase();

                return (
                  searchTerm &&
                  userName.startsWith(searchTerm) &&
                  userName !== searchTerm
                );
              })
              .slice(0, 8)
              .map((person) => (
                <div
                  onClick={() => onSearch(person)}
                  className="dropdown-content"
                  key={person}
                >
                  {person}
                </div>
              ))}
          </div>
        </div>

        <button className="searchButton" onClick={() => onSearch(searchUser)}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
