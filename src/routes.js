const express = require('express');


// Controllers
const professoresController = require('./controllers/professoresController')
const avaliacoesController = require('./controllers/avaliacoesController')


const routes = express.Router();

routes.get('/professores', professoresController.list)
routes.get('/professores/:id', professoresController.listById)
routes.post('/professores', professoresController.create)
routes.put('/professores', professoresController.update)
routes.delete('/professores', professoresController.delete)

routes.get('/avaliacoes/:professor_id', avaliacoesController.list)
routes.post('/avaliacoes', avaliacoesController.create)
routes.put('/avaliacoes', avaliacoesController.update)
routes.delete('/avaliacoes', avaliacoesController.delete)

module.exports = routes
