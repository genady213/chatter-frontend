import React from 'react';
import { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import Cookies from 'js-cookie';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './EventsPage.css';
import Event from './Event';

export function EventsPage() {

  
	const [theEvents, setTheEvents] = useState([])
	const [noEvents, setNoEvents] = useState(false)


  function getEvents() {
    apiClient.get('/event/user/' + Cookies.get('userid')
      , { headers: {"Authorization" : `${Cookies.get('token')}`} })
      .then((response) => {
        console.log(response.data);
        if (!theEvents.length){setNoEvents(false)}
        setTheEvents(response.data);
      }, (error) => {
      console.log(error);
      });};

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  useEffect(() => {
	
		
			const req = apiClient.get('/event/user/' + Cookies.get('userid')
      , { headers: {"Authorization" : `${Cookies.get('token')}`} })
      .then((response) => {
        console.log(response.data);
        setTheEvents(response.data);
      }, (error) => {
      console.log(error);
      });


		
	}, [])

	useEffect(() => {
		if (!theEvents.length) setNoEvents(true)
		else setNoEvents(false)
	}, [theEvents])



	const userEvents = noEvents ? (
		<Event noEvents={noEvents} />
	) : (
		theEvents.map(({ message, _id, timeSent, username}) => (
			<Event
				message={message}
				timestamp={timeSent}
				user={username}
				key={timeSent}
			/>
		))
	)
  

  return (
    <div class="events-body-container">
      <div className="events-top-container">
        <div
          className="arrow"
          onClick={() => {
            routeChange();
          }}
        >
          <ArrowBackIosIcon />
        </div>
        <div className="events-title">
        <h1>Events</h1>
        <img src="/chatterLogo.png" width="75" height="75" />
          
        </div>
      </div>
      <div className="events">{userEvents}</div>
      
    </div>
  );
}
