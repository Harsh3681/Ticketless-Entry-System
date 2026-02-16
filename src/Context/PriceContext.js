import { createContext, useContext } from "react";

export const PriceContext = createContext();



export const usePriceContext = () => useContext(PriceContext)
