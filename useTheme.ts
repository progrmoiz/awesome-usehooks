import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const useTheme = (initialTheme: Theme) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const storageTheme = window.localStorage.getItem('theme');
    if (storageTheme) {
      setTheme(storageTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
};
