import React from 'react';
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import CommentIcon from '@mui/icons-material/Comment';

function Sidebar() {
    return(
        <div className="sidebar">
             <div className="sidebar_header">
                <div className="sidebar_info">
                    <h3>OnlyFriends Logo</h3>
                    
                </div>
                <CreateIcon />
                
             </div>
             <SidebarOption Icon={CommentIcon} title="Threads"/>
             <SidebarOption  title="Second"/>
        </div>

    )


}

export default Sidebar