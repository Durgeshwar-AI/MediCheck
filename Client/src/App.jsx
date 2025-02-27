import React from "react";
import Home from "./Pages/Home";
import { Routes,Route } from "react-router-dom";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
import Support from "./Pages/Support";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/team" element={<Team/>} />
        <Route path="/support" element={<Support/>} />
      </Routes>
    </div>
  );
};

export default App;
