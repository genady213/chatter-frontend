import React from 'react';
import './LoginPage.css';
import { Footer } from '../../components/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';

export function LoginPage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Home`;
    navigate(path);
  };

  return (
    <div className="login-top-container">
      <div className="login-form-container">
        <form className="login-form">
          <h3>Login:</h3>
          <br></br>
          <label for="fname">Username:</label>
          <input type="text" id="Username" placeholder="Username"></input>
          <br></br>
          <label for="lname">Password:</label>
          <input type="text" id="Password" placeholder="Password"></input>
          <br></br>
          <button
            className="login-button"
            type="submit"
            value="Submit"
            onClick={routeChange}
          >
            Login
          </button>
          <br></br>
          <a href="#">Create an Account</a>
        </form>
      </div>

      <Footer />
    </div>
  );
}
