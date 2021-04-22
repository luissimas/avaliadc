<<<<<<< HEAD
const express = require('express');

// Controllers
const professoresController = require('./controllers/professoresController');
const avaliacoesController = require('./controllers/avaliacoesController');

// Validação
const professoresValidator = require('./middlewares/validation/professoresValidator');
const avaliacoesValidator = require('./middlewares/validation/avaliacoesValidator');

const routes = express.Router();

// Professores
routes.get(
  '/professores',
  professoresValidator.list,
  professoresController.list
);

routes.get(
  '/professores/:id',
  professoresValidator.listById,
  professoresController.listById
);

routes.post(
  '/professores',
  professoresValidator.create,
  professoresController.create
);

routes.put(
  '/professores/:id',
  professoresValidator.update,
  professoresController.update
);

routes.delete(
  '/professores/:id',
  professoresValidator.delete,
  professoresController.delete
);

// Avaliações
routes.get(
  '/avaliacoes/:professor_id',
  avaliacoesValidator.list,
  avaliacoesController.list
);

routes.post(
  '/avaliacoes',
  avaliacoesValidator.create,
  avaliacoesController.create
);

routes.put(
  '/avaliacoes/:id',
  avaliacoesValidator.update,
  avaliacoesController.update
);

routes.delete(
  '/avaliacoes/:id',
  avaliacoesValidator.delete,
  avaliacoesController.delete
);

module.exports = routes;
=======
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Home from './pages/home'
import Professor from './pages/professor'
import Avaliar from './pages/avaliar'

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/professor" exact component={Professor} />
        <Route path="/avaliar" exact component={Avaliar} />
      </Switch>
    </Router>
  );
}
>>>>>>> frontend/master
