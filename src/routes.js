import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/home'

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}
