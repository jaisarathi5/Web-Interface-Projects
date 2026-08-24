import { createContext, useContext, useState, useCallback } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [view, setView] = useState('login');
  const [params, setParams] = useState({});

  const navigateTo = useCallback((newView, newParams = {}) => {
    setView(newView);
    setParams(newParams);
  }, []);

  return (
    <NavigationContext.Provider value={{ view, params, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNav must be used within NavigationProvider');
  return ctx;
}
