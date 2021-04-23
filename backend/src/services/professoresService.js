const database = require('../database/connection');
const avaliacoesService = require('../services/avaliacoesService');

module.exports = {
  async getCount(searchArg) {
    if (searchArg) {
      return await database('professores')
        .where('nome', 'like', `%${searchArg}%`)
        .count()
        .first();
    }

    return await database('professores').count().first();
  },

  async list(page) {
    const professores = await database('professores')
      .limit(10)
      .offset((page - 1) * 10)
      .select();

    let professoresReady = [];

    for (professor of professores) {
      const avaliacoes = await avaliacoesService.getCount(professor.id);

      professoresReady.push({
        id: professor.id,
        nome: professor.nome,
        qualificacao: professor.qualificacao,
        avaliacoesCount: avaliacoes['count(*)'],
      });
    }

    return professoresReady;
  },

  async getById(id) {
    return await database('professores').where('id', id).select().first();
  },

  async getByName(name, page) {
    return await database('professores')
      .where('nome', 'like', `%${name}%`)
      .limit(10)
      .offset((page - 1) * 10)
      .select();
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
