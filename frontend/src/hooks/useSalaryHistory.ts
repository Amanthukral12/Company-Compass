import { useContext } from "react";
import { SalaryHistoryContext } from "../context/SalaryHistoryContext";

export const useSalaryHistory = () => {
  const context = useContext(SalaryHistoryContext);

  if (!context) {
    throw new Error(
      "useSalaryHistory must be used within SalaryHistoryProvider"
    );
  }
  return context;
};
