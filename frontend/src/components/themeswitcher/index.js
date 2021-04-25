import React, { useState } from "react";

import "./style.css";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(false);

  const initialColors = {
    bg: "#f0f0f5",
    bgLight: "#FFF",
    border: "#dcdce6",
    highligt: "#3470DA",
    text: "#000",
    textLight: "#737380",
    textBold: "#41414d",
  };

  const darkColors = {
    bg: "#292d3e",
    bgLight: "#434758",
    border: "#d0d0d0",
    highligt: "#f07178",
    text: "#fff",
    textLight: "#dcdce6",
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
    console.log(initialColors)

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
