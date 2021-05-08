import React, { useState, useEffect } from 'react';

import './style.css';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(false);

  const initialColors = {
    bg: '#f0f0f5',
    bgLight: '#FFF',
    border: '#dcdce6',
    highligt: '#3470DA',
    text: '#000',
    textLight: '#737380',
    textBold: '#41414d',
  };

  const darkColors = {
    bg: '#292d3e',
    bgLight: '#434758',
    border: '#d0d0d0',
    highligt: '#f07178',
    text: '#fff',
    textLight: '#dcdce6',
    textBold: '#d0d0d0',
  };

  // Converte as chaves do objeto para as variáveis do css
  function transformKey(key) {
    return '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();
  }

  function changeColors(colors) {
    Object.keys(colors).map((key) => {
      document.body.style.setProperty(transformKey(key), colors[key]);
    });
  }

  // Handle theme change
  function handleTheme() {
    changeColors(theme ? initialColors : darkColors);
    localStorage.setItem('theme', theme ? 'light' : 'dark');

    setTheme(!theme);
  }

  // Hook that loads theme from localStorage
  useEffect(() => {
    const themeStored = localStorage.getItem('theme');

    // Check if the value exists by its type
    if (typeof themeStored !== 'string') {
      localStorage.setItem('theme', theme ? 'light' : 'dark');
    } else {
      setTheme(themeStored == 'dark' ? true : false);
      changeColors(themeStored == 'light' ? initialColors : darkColors);
    }
  }, []);

  return (
    <div className="switch-container">
      <input
        id="switch"
        type="checkbox"
        checked={theme}
        onChange={() => {
          handleTheme();
        }}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}
