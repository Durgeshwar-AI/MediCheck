import React, { useEffect } from "react";
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
import About from "./Pages/User/About";
import PrivacyPolicy from "./Pages/User/Privacy";
import TermsOfService from "./Pages/User/Terms";
import HospitalEmergency from "./Pages/Hospital/HospitalEmergency";
import HospitalAppointments from "./Pages/Hospital/HospitalAppointments";
import HospitalPatients from "./Pages/Hospital/HospitalPatients";
import HospitalDoctors from "./Pages/Hospital/HospitalDoctors";
import HospitalFacilities from "./Pages/Hospital/HospitalFacilities";
import HospitalLogin from "./Pages/Hospital/HospitalLogin";
import Redirect from "./Pages/Redirect";
import UserAppointments from "./Pages/User/UserAppointments";
import UserMedicalRecords from "./Pages/User/UserMedicalRecords";
import { HealthProvider } from "./context/HealthDataContext";
import UserAI from "./Pages/User/UserAI";
import { useHealth } from "./hooks/useHealth";
const App = () => {
  const { userLoggedIn, type } = useHealth();

  function autoDeleteToken() {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
  
    const currentTime = Date.now();
  
    const timeout = expiryTime - currentTime;
    if (timeout <= 0) {
      localStorage.removeItem('authToken');
    } else {
      setTimeout(() => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
      }, timeout);
    }
  }
  
  autoDeleteToken();
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        {type != "hospital" ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </>
        ) : (
          <>
            <Route path="/hospitalDashboard" element={<HospitalDashboard />} />
            <Route path="/hospitalEmergency" element={<HospitalEmergency />} />
            <Route
              path="/hospitalAppointments"
              element={<HospitalAppointments />}
            />
            <Route path="/hospitalPatients" element={<HospitalPatients />} />
            <Route path="/hospitalDoctors" element={<HospitalDoctors />} />
            <Route
              path="/hospitalFacilities"
              element={<HospitalFacilities />}
            />
          </>
        )}
        {type == "user" && userLoggedIn && (
          <>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/appointments" element={<UserAppointments />} />
            <Route path="/records" element={<UserMedicalRecords />} />
            <Route path="/ai" element={<UserAI />} />
          </>
        )}
        {!userLoggedIn && (
          <>
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hospitalLogin" element={<HospitalLogin />} />
          </>
        )}
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </div>
  );
};

export default App;
