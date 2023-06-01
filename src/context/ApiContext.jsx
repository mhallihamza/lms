import { createContext} from "react";

export const ApiContext = createContext();

export  function ApiContextProvider(Props) {
    const Api_url = "https://lmsapi-mhallihamza.onrender.com";
  return (
    <ApiContext.Provider value={{Api_url}}>
        {Props.children}
    </ApiContext.Provider>
  )
}
