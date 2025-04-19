import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initializeTokenCheck } from "./utils/auth";
import { HealthProvider } from "./context/HealthDataContext.jsx";

// Initialize token check on application load
initializeTokenCheck();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HealthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </HealthProvider>
  </StrictMode>
);