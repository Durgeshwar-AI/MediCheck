import { createContext, useContext } from "react";

export const HealthContext = createContext();
export const useHealth = () => useContext(HealthContext);