import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './EventsPage.css';

export function EventsPage() {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  

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

      
    </div>
  );
}
