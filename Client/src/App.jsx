import React from "react";
import Home from "./Pages/User/Home";
import { Routes, Route } from "react-router-dom";
import Contact from "./Pages/User/Contact";
import Team from "./Pages/User/Team";
import Support from "./Pages/User/Support";
import PageNotAvailable from "./Components/PageError";
import Landing from "./Pages/Landing";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import UserDashboard from "./Pages/User/UserDashboard";
import HospitalDashboard from "./Pages/Hospital/HospitalDashboard";

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/support" element={<Support />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/hospitalDashboard' element={<HospitalDashboard/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </div>
  );
};

export default App;