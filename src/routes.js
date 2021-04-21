import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/home'
import Professor from './pages/professor'

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/professor" exact component={Professor} />
      </Switch>
    </Router>
  );
}
