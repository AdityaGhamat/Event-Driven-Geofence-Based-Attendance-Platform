import { useContext } from "react";
import { OfficeContext } from "../context/OfficeContext";

export function useOffice() {
  const context = useContext(OfficeContext);
  if (!context) {
    throw new Error("useOffice must be used within OfficeProvider");
  }
  return context;
}
