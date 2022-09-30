import React from 'react';
import '../../App.css';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import { Topbar } from '../../components/Topbar/Topbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export function HomePage() {
  return (
    <div className="App">
      <Topbar />
      <div className="app_body"></div>
      <Sidebar />
    </div>
  );
}
