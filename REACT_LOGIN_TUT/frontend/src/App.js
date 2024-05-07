
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/Login";
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
   <>
     <Routes>
        <Route  path="/login" element= {<Login />} />
        <Route  path="/" element= {<Login />} />
        <Route  path="/register" element= {<Signup />} />
        <Route  path="/dashboard" element= {<Dashboard />} />
     </Routes>
   </>
  );
}

export default App;
