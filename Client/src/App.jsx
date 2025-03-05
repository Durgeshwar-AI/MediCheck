import React from "react";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
import Support from "./Pages/Support";
import PageNotAvailable from "./Components/PageError";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </div>
  );
};

export default App;
