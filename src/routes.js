const express = require('express');


// Controllers
const professoresController = require('./controllers/professoresController')
const avaliacoesController = require('./controllers/avaliacoesController')


const routes = express.Router();

routes.get('/professores/list', professoresController.list)
routes.get('/professores/create', professoresController.create)
routes.delete('/professores/delete', professoresController.delete)
routes.post('/professores/update', professoresController.update)

module.exports = routes
