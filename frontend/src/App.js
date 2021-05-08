import React from 'react';

import './global.css';

import Routes from './routes';
import ThemeSwitcher from './components/themeswitcher';

function App() {
  return (
    <div>
      <ThemeSwitcher />
      <Routes />
    </div>
  );
}

export default App;
