exports.up = function (knex) {
  return knex.schema.createTable('avaliacoes', function (table) {
    // Chave primária que se autoincrementa
    table.increments('id');

    table.string('curso').notNullable();
    table.integer('ano_ingresso').notNullable();

    table.text('comentario').notNullable();

    table.integer('avaliacao_conhecimento').notNullable();
    table.integer('avaliacao_didatica').notNullable();
    table.integer('avaliacao_tirar_duvidas').notNullable();
    table.integer('avaliacao_dialogo').notNullable();
    table.integer('avaliacao_metodo_avaliativo').notNullable();
    table.integer('avaliacao_conteudo_cobrado').notNullable();
    table.integer('avaliacao_correcao').notNullable();
    table.integer('avaliacao_materiais').notNullable();
    table.integer('avaliacao_cuidado_ofensivo').notNullable();
    table.boolean('cobra_presenca').notNullable();

    // Chave estrangeira id do professor sendo avaliado
    table.integer('professor_id').notNullable();

    // Efetivamente referenciando a chave estrangeira na tabela de professores
    table.foreign('professor_id').references('id').inTable('professores');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('avaliacoes');
};
