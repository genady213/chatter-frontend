import React from 'react';
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

      
    </div>
  );
}
