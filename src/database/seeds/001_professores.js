exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('professores')
    .del()
    .then(function () {
      let i;
      let professoresArray = [];

      for (i = 0; i < 43; i++) {
        professoresArray.push({
          nome: `Professor seeded ${i}`,
          qualificacao: `Qualificacao do professor ${i}`,
        });
      }
      // Inserts seed entries
      return knex('professores').insert(professoresArray);
    });
};
