import { createContext, useState, useContext } from 'react';

const CLAuthContext = createContext(null);

export const CLAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clUser, setClUser] = useState(null);

  return (
    <CLAuthContext.Provider value={{ isAuthenticated, clUser, setIsAuthenticated, setClUser }}>
      {children}
    </CLAuthContext.Provider>
  );
};

export const useCLAuth = () => useContext(CLAuthContext);