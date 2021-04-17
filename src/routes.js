const express = require('express');


// Controllers
const professoresController = require('./controllers/professoresController')
const avaliacoesController = require('./controllers/avaliacoesController')


const routes = express.Router();

routes.get('/professores', professoresController.create)
routes.delete('/professores/delete/:id', professoresController.delete)
routes.post('/professores/update/:id', professoresController.update)

module.exports = routes
