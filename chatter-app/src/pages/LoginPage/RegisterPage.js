import React from 'react';
import './RegisterPage.css';
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
    const req = await axios.post('/user/signup', {"name":name,"username":user,"password":pass})
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }


  return (
    <div className="login-top-container">
      <div className="login-form-container">
        <form className="login-form">
          <h3>Register:</h3>
          <br></br>
          <label htmlFor="name">Name:</label>
          <input ref={myname} type="text" id="Name" placeholder="Name" ></input>
          <br></br>
          <label htmlFor="fname">Username:</label>
          <input ref={myuser} type="text" id="Username" placeholder="Username" ></input>
          <br></br>
          <label htmlFor="lname">Password:</label>
          <input ref={mypass} type="text" id="Password" placeholder="Password" ></input>
          <br></br>
          <button
            className="register-button"
            type="submit"
            value="Submit"
            onClick={() => {
              routeChange();
              sendData(myname.current.value,myuser.current.value,mypass.current.value);
            }}
          >
            Register
          </button>
          <br></br>
        </form>
      </div>

      <Footer />
    </div>
  );
}
