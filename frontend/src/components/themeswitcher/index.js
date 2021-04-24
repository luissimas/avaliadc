import React, { useState } from "react";

import "./style.css";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(false);

  function getStyle(style) {
    window.getComputedStyle(document.body).getPropertyValue(style);
  }

  const initialColors = {
    bg: getStyle("--bg"),
    bgLight: getStyle("--bg-light"),
    border: getStyle("--border"),
    highligt: getStyle("--highligt"),
    text: getStyle("--text"),
    textBold: getStyle("--text-bold"),
  };

  const darkColors = {
    bg: "#292d3e",
    bgLight: "#434758",
    border: "#d0d0d0",
    highligt: "#f07178",
    text: "#ffffff",
    textBold: "#d0d0d0",
  };

  // Converte as chaves do objeto para as variáveis do css
  function transformKey(key) {
    return "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();
  }

  function changeColors(colors) {
    Object.keys(colors).map((key) => {
      document.body.style.setProperty(transformKey(key), colors[key]);
    });
  }

  function handleTheme() {
    changeColors(theme ? initialColors : darkColors);

    setTheme(!theme);
  }

  return (
    <div className="switch-container">
      <input id="switch" type="checkbox" onChange={handleTheme} />
      <label for="switch">Toggle</label>
    </div>
  );
}
