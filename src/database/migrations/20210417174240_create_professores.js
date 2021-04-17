exports.up = function (knex) {
  return knex.schema.createTable('professores', function (table) {
    // Chave primária que se auto-incrementa
    table.increments();

    table.string('nome').notNullable();
    table.string('qualificacao').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('professores');
};
