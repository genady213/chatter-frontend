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

  const [currInput, setCurrInput] = useState('');

  const getUsers = async () => {
    const request = await apiClient //+ searchQuery.current.value
      .get('/user/search/' + searchQuery.current.value, {
        headers: { Authorization: `${Cookies.get('token')}` },
      })
      .then(
        (response) => {
          setUsers(response.data); //fill in the array with users
          console.log(users);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  let navigate = useNavigate();
  const logOut = () => {
    apiClient.defaults.headers.common['Authorization'] = '';
    delete apiClient.defaults.headers.common['Authorization'];
    Cookies.set('token', '');
    Cookies.set('userid', '');
    let path = `/`;
    navigate(path);
  };

  const onChange = (event) => {
    setCurrInput(event.target.value); //this is the current input user has typed in
    getUsers(); //sends that current input to make a call to get an array of matching users to that input
  };

  //When the user clicks the search button to look for that user
  const onSearch = (searchUser) => {
    console.log('searching for', searchUser);
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
            ref={searchQuery}
            type="text"
            value={currInput}
            onChange={onChange}
            placeholder="Search"
            className="searchFields"
          />
          <div className="dropdownsearch">
            {users.slice(0, 7).map((user) => (
              <div
                onClick={() => onSearch(user)}
                className="dropdown-content"
                key={user._id}
              >
                {user.username}
              </div>
            ))}
          </div>
        </div>

        <button
          className="searchButton"
          onClick={() => onSearch(searchQuery.current.value)}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
