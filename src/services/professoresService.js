const database = require('../database/connection');

module.exports = {
  async getCount() {
    return await database('professores').count().first();
  },

  async list(page) {
    return await database('professores')
      .limit(10)
      .offset((page - 1) * 5)
      .select();
  },

  async getById(id) {
    return await database('professores').where('id', id).select().first();
  },

  async create(nome, qualificacao) {
    return await database('professores').insert({
      nome,
      qualificacao,
    });
  },

  async update(id, nome, qualificacao) {
    return await database('professores').where('id', id).update({
      nome: nome,
      qualificacao: qualificacao,
    });
  },

  async delete(id) {
    return await database('professores').where('id', id).delete();
  },
};
