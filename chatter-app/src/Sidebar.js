import React from 'react';
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';

<<<<<<< Updated upstream:chatter-app/src/Sidebar.js
function Sidebar() {
    return(
        <div className="sidebar">
             <div className="sidebar_header">
                <div className="sidebar_info">
                    <h3>Direct Messages</h3>
                    
                </div>
                <CreateIcon />
             </div>
=======
export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h3>OnlyFriends Logo</h3>
>>>>>>> Stashed changes:chatter-app/src/components/Sidebar/Sidebar.js
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={CommentIcon} title="Threads" />
      <SidebarOption title="Second" />
    </div>
  );
}
