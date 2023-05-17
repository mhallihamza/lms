import { useEffect } from "react";
import { createContext} from "react";

export const ApiContext = createContext();

export  function ApiContextProvider(Props) {
    const Api_url = "http://localhost:3000";
  return (
    <ApiContext.Provider value={{Api_url}}>
        {Props.children}
    </ApiContext.Provider>
  )
}
