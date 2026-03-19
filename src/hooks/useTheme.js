import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('dark'); // dark by default

  useEffect(() => {
    // Read from localStorage on first load
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return { theme, toggleTheme };
}