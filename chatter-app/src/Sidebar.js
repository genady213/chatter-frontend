import React from 'react';
import './Sidebar.css';
import CreateIcon from '@mui/icons-material/Create';

function Sidebar() {
    return(
        <div className="sidebar">
             <div className="sidebar_header">
                <div className="sidebar_info">
                    <h3>Direct Messages</h3>
                    
                </div>
                <CreateIcon />
             </div>
        </div>

    )


}

export default Sidebar