import React from 'react';
import './SidebarOption.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import { PusherClient } from '../../client';
import Cookies from 'js-cookie';

function SidebarOption({ keys, title, id, Icon}) {
    
  let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Home/conversation/` + keys;
        //PusherClient(Cookies.get('userid'),keys)
        navigate(path);
      };
    return(
        <div className="sidebarOption"
        onClick={routeChange}>
             {Icon && <Icon className="sidebarOption_icon"/>}
             {Icon ? <h3>{title} </h3> : <h3 className="sidebarOption_list"> <span className="sidebarOption_channels"> {title} </span> </h3>
             }
        </div>

    )


}

export default SidebarOption