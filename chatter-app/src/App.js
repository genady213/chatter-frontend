import './App.css';
import Topbar from "./components/Topbar/Topbar";
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      
    <Topbar/>
    <div className="app_body">
        <Sidebar/>

    </div>  


    </div>
  );
}

export default App;
