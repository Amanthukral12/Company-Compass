import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used with in EmployeeProvider");
  }
  return context;
};
