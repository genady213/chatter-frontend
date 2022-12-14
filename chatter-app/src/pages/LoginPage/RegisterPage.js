import React from 'react';
import './RegisterPage.css';
import { useRef } from 'react';
import { Footer } from '../../components/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from '../../axios';

export function RegisterPage() {
  const myname = useRef(null);
  const myuser = useRef(null);
  const mypass = useRef(null);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  async function sendData(name, user, pass) {
    var theans = '';
    const req = await axios
      .post('/user/signup', { "name": name, "username": user, "password": pass })
      .then(
        (response) => {
          console.log(response);
          theans = response.data.message;
          return theans;
        },
        (error) => {
          console.log(error);
        }
      );
    return theans;
  }

  return (
    <div class="register-body-container">
      <div className="register-top-container">
        <div
          className="arrow"
          onClick={() => {
            routeChange();
          }}
        >
          <ArrowBackIosIcon />
        </div>
        <div className="register-title">
          <span>
            <img src="/chatterLogo.png" width="75" height="75" />
            <h1>Chatter</h1>
          </span>
        </div>
      </div>

      <div className="register-form-container">
        <form className="register-form">
          <br></br>
          <input
            ref={myname}
            type="text"
            id="Name"
            placeholder="Name"
            className="register-loginFields"
          ></input>
          <input
            //ref={myemail} register does not take in email
            type="text"
            id="Email"
            placeholder="Email"
            className="register-loginFields"
          ></input>
          <input
            ref={myuser}
            type="text"
            id="Username"
            placeholder="Username"
            className="register-loginFields"
          ></input>
          <br></br>
          <input
            ref={mypass}
            type="password"
            id="Password"
            placeholder="Password"
            className="register-loginFields"
          ></input>
          <br></br>
          <button
            className="register-button"
            type="button"
            value="Submit"
            onClick={async () => {
              const theToken = await sendData(
                myname.current.value,
                myuser.current.value,
                mypass.current.value
              );
              if (theToken == 'Success') {
                routeChange();
              } else {
                document.getElementById('error').style.visibility = 'visible';
              }
            }}
          >
            Create Account
          </button>
          <a
            onClick={() => {
              routeChange();
            }}
          >
            Already have an account? Login
          </a>
          <div id="error" className="error-user">
            Error Creating Account
          </div>
          <br></br>
        </form>
      </div>
      <Footer />
    </div>
  );
}
