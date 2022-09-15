import Dashboard from "./pages/Dashboard";
import JobDescription from "./pages/JobDescription";
import Pagination from "./components/Pagination";
import UserApplications from "./pages/UserApplications";
import Login from "./pages/Login";
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/JobComponent.css';
import './styles/JobDescription.css';
import './styles/Topnav.css';
import './styles/Login.css';
import './styles/Pagination.css';
import './styles/Register.css';
import './styles/Logout.css';
import './styles/UserApplications.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job-description" element={<JobDescription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-applications" element={<UserApplications />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
