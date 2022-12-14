import React from 'react';
import './LoginPage.css';
import { useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
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
import apiClient from '../../apiClient';

export var token = '';

export function LoginPage() {
  const myuser = useRef('');
  const mypass = useRef('');
  let navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('token') != null && Cookies.get('token') != '') {
      let path = `/Home`;
      navigate(path);
    }}, []);
   async function sendData(user, pass) {
    var theans = "";
    const req = await axios.post('/user/login', {"username":user,"password":pass})
    .then((response) => {
      console.log(response);
      theans = response.data.message;
      token = response.data.token;
      Cookies.set('userid', response.data.id);
      Cookies.set('username', user);
      apiClient.defaults.headers.common["Authorization"] = token;
    return theans;
    }, (error) => {
      console.log(error);
    });
    return theans;
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
      <div>
          <div className="login-top-container">
              <img className="logo" src="/chatterLogo.png" width="75" height="75" />
              <h1 className="title">Chatter</h1>
          <div className="login-form-container">
            <form className="login-form">
            <div 
              id = "error"
              className="error-user">Username or Password Incorrect</div>
                <input ref={myuser} type="text" id="Username" placeholder="Username"className="loginFields"></input>
                <br></br>
                <input ref={mypass} type="password" id="Password" placeholder="Password" className="loginFields"></input>
                <br></br>
                <div className="buttondiv">
              <button
                className="login-button"
                type="button"
                value="Submit"
                onClick={async () => {
                  const theToken = await sendData(
                    myuser.current.value,
                    mypass.current.value
                  );
                  if (theToken == 'Success') {
                    Cookies.set('token', token);
                    routeChange();
                  } else {
                    document.getElementById('error').style.visibility =
                      'visible';
                  }
                }}
              >
                Login
              </button>
            </div>

            <a
              href="#"
              onClick={routeChangeRegister}
              className="createAccountButton"
            >
              Create Account
            </a>
          </form>
        </div>
      </div>
        <div className="login-middle-container">
          <div className="imagesContainer">
            <div className="textHeader"><h1>A New Way To Connect and Meetup</h1></div>
            <div className="collageContainer">
              <img src="/LoginImg-1.png" className="img1" alt="image1"></img>
              <img src="/LoginImg-2.png" className="img2" alt="image2"></img>
              <img src="/LoginImg-3.png" className="img3" alt="image3"></img>
              <img src ="/LoginImg-4.png" className="img4" alt="image4"></img>
            </div>
            <div className="chatImage">
              <img src ="/LoginImg-5.png" className="img5" alt="image4"></img>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}
