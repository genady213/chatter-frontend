import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/LoginPage/RegisterPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* This will be the default route, we will later implement a conditional to check if user is 
        already logged in or not, so we can determine to send them to the login page or homepage (homepage is "/" for now*/}
      {/*Default page is Login page */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/Register/*" element={<RegisterPage />} />
      <Route path="/Home/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
