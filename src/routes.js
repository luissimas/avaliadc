const express = require('express');

// Controllers
const professoresController = require('./controllers/professoresController');
const avaliacoesController = require('./controllers/avaliacoesController');

// Validação
const { celebrate, Joi, Segments } = require('celebrate');
const professoresValidator = require('./validation/professoresValidator');
const avaliacoesValidator = require('./validation/avaliacoesValidator');

const routes = express.Router();

// Professores
routes.get('/professores', professoresController.list);

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

routes.get('/avaliacoes/:professor_id', avaliacoesController.list);
routes.post('/avaliacoes', avaliacoesController.create);
routes.put('/avaliacoes', avaliacoesController.update);
routes.delete('/avaliacoes', avaliacoesController.delete);

module.exports = routes;
