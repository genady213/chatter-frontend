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
    var theans = "";
    const req = await axios.post('/user/signup', {"name":name,"username":user,"password":pass})
    .then((response) => {
      console.log(response);
      theans = response.data.message;
    return theans;
    }, (error) => {
      console.log(error);
    });
    return theans;
  }


  return (
    <div className="register-top-container">
      <div className="arrow"
      onClick={() => {
        routeChange()
      }}>
      <ArrowBackIosIcon/></div>
      <div className="register-form-container">
        <form className="register-form">
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
            type="button"
            value="Submit"
            onClick={async() => {
              const theToken = await sendData(myname.current.value,myuser.current.value,mypass.current.value);
              if(theToken == "Success"){
                routeChange();}else{
                 document.getElementById("error").style.visibility = 'visible';
               } 
            }}
          >
            Register
          </button>
          <div 
          id = "error"
          className="error-user">Error Creating Account</div>
          <br></br>
        </form>
      </div>

      <Footer />
    </div>
  );
}
