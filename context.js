import { createContext, useContext, useState } from "react";

export const DBContext = createContext();

export const useDB = () => {
  return useContext(DBContext);
};
