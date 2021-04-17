const knex = require('knex');

// Importando as configurações do knexfile
const configuration = require('../../knexfile');

// Verificação de variável indicando se está sendo rodado um teste
const config =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

// Criando a conexão usando as configurações do campo indicado
const connection = knex(config);

module.exports = connection;
