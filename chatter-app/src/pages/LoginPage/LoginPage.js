import React from 'react';
import './LoginPage.css';
import {useRef} from 'react';
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
import axios from '../../axios';

export function LoginPage() {
  const myuser = useRef('');
  const mypass = useRef('');
  let navigate = useNavigate();
  async function sendData(user, pass) {
    const req = await axios.post('/user/login', {"username":user,"password":pass})
    .then((response) => {
      console.log(response);
      let path = `/Home`;
    navigate(path);
    }, (error) => {
      console.log(error);
    });
  }
  const routeChange = () => {
    let path = `/Home`;
    navigate(path);
  };
  const routeChangeRegister = () => {
    let path = `/Register`;
    navigate(path);
  };

  return (
    <div className="login-top-container">
      <div className="login-form-container">
        <form className="login-form">
          <h3>Login:</h3>
          <br></br>
          <label for="fname">Username:</label>
          <input ref={myuser} type="text" id="Username" placeholder="Username"></input>
          <br></br>
          <label for="lname">Password:</label>
          <input ref={mypass} type="text" id="Password" placeholder="Password"></input>
          <br></br>
          <button
            className="login-button"
            type="submit"
            value="Submit"
            onClick={() => sendData(myuser.current.value,mypass.current.value)}
          >
            Login
          </button>
          <br></br>
          <a href="#"
          onClick={routeChangeRegister}
          >Create an Account
          </a>
        </form>
      </div>

      <Footer />
    </div>
  );
}
