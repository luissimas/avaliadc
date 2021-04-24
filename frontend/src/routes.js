import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/home'
import Professor from './pages/professor'
import Avaliar from './pages/avaliar'
import ThemeSwitcher from './components/themeswitcher'

export default function Routes(){
  return(
    <Router>
    <ThemeSwitcher/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/professor" exact component={Professor} />
        <Route path="/avaliar" exact component={Avaliar} />
      </Switch>
    </Router>
  );
}
