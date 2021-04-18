exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('professores')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('professores').insert([
        { nome: 'Professor seeded 1', qualificacao: 'Doutorado em seed' },
        { nome: 'Professor seeded 2', qualificacao: 'Mestrado em seed' },
        { nome: 'Professor seeded 3', qualificacao: 'Confia no pai' },
      ]);
    });
};
