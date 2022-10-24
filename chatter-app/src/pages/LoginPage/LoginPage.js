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

export var token = "";

export function LoginPage() {
  const myuser = useRef('');
  const mypass = useRef('');
  let navigate = useNavigate();
   async function sendData(user, pass) {
    var theans = "";
    const req = await axios.post('/user/login', {"username":user,"password":pass})
    .then((response) => {
      console.log(response);
      theans = response.data.message;
      token = response.data.token;
    axios.defaults.headers.common["Authorization"] = token;
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
    <div className="login-top-container">
      <div className="login-form-container">
        <form className="login-form">
          <h3>Login:</h3>
          <br></br>
          <label htmlFor="fname">Username:</label>
          <input ref={myuser} type="text" id="Username" placeholder="Username"></input>
          <br></br>
          <label htmlFor="lname">Password:</label>
          <input ref={mypass} type="text" id="Password" placeholder="Password"></input>
          <br></br>
          <button
            className="login-button"
            type="button"
            value="Submit"
            onClick={async() => {
              const theToken = await sendData(myuser.current.value,mypass.current.value);             
              if(theToken == "Success"){
               routeChange();}else{
                document.getElementById("error").style.visibility = 'visible';
              }              
            }}
          >
            Login
          </button>
          <div 
          id = "error"
          className="error-user">Username or Password Incorrect</div>
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
