"use client";

import { useState, createContext, useContext, PropsWithChildren, useLayoutEffect } from 'react';

const initialTheme = () => localStorage.getItem("theme");

export const ThemeContext = createContext({
    theme: 'day',
    toggleTheme: () => {},
});




export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState(initialTheme() ?? 'day');

  useLayoutEffect(()=>{
    localStorage.setItem("theme", theme);
    if (theme === 'night') {
      document.body.style.backgroundColor = '#111111';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'day' ? 'night' : 'day'));
    
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
