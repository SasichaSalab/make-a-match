import React, { createContext, useState, useEffect, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Provide a way to access AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You can replace this with your actual authentication logic
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Example: Get user from localStorage
    setUser(loggedInUser);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Example: Store user in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
