import React from 'react';
import '../../App.css';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import { Topbar } from '../../components/Topbar/Topbar.js';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Footer } from '../../components/Footer/Footer.js';

export function HomePage() {
  return (
    <div className="App">
      <Topbar />
      <div className="app_body"></div>
      <Sidebar />
      <Footer />
    </div>
  );
}
