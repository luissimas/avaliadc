const generate = require('../../utils/generateRandom.js')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('professores')
    .del()
    .then(function () {
      let i;
      let professoresArray = [];

      const firstNameArray = ['Ednaldo', 'Renato', 'Helena', 'Mariana', 'Ricardo']
      const lastNameArray = ['Pizzolato', 'Bueno', 'da Costa', 'Silva', 'Menotti']

      const qualificacaoTipo = ['Formado em', 'Mestrado em', 'Doutorado em', 'Pesquisador na área de', 'Charlatão em']
      const qualificacaoArea = ['inteligência artificial', 'criptografia', 'análise de dados', 'gestão de projetos', 'sistemas digitais']

      for (i = 0; i < 43; i++) {
        professoresArray.push({
          nome: `${firstNameArray[generate.randomNumber(0, 4)]} ${lastNameArray[generate.randomNumber(0, 4)]}`,
          qualificacao: `${qualificacaoTipo[generate.randomNumber(0, 4)]} ${qualificacaoArea[generate.randomNumber(0, 4)]}`,
        });
      }

      // Inserts seed entries
      return knex('professores').insert(professoresArray);
    });
};
