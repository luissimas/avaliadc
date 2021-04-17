const express = require('express');


// Controllers
const professoresController = require('./controllers/professoresController')
const avaliacoesController = require('./controllers/avaliacoesController')


const routes = express.Router();

routes.get('/professores/list', professoresController.list)
routes.get('/professores/create', professoresController.create)
routes.delete('/professores/delete', professoresController.delete)
routes.post('/professores/update', professoresController.update)

routes.get('/avaliacoes/list', avaliacoesController.list)
routes.get('/avaliacoes/create', avaliacoesController.create)
routes.delete('/avaliacoes/delete', avaliacoesController.delete)
routes.post('/avaliacoes/update', avaliacoesController.update)

module.exports = routes
