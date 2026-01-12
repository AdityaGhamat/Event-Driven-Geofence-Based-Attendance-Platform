import { createContext, useState, type ReactNode } from "react";
import type { IOfficeContext, ISearchCardProps } from "../types";

export const OfficeContext = createContext<IOfficeContext | undefined>(
  undefined
);
interface IOfficeProviderProps {
  children: ReactNode;
}

export const OfficeProvider = ({ children }: IOfficeProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [office, setOffice] = useState<ISearchCardProps[]>([]);
  return (
    <OfficeContext.Provider value={{ search, setSearch, office, setOffice }}>
      {children}
    </OfficeContext.Provider>
  );
};
