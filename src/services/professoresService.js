const database = require('../database/connection');
const avaliacoesService = require('../services/avaliacoesService');

module.exports = {
  async getCount() {
    return await database('professores').count().first();
  },

  async list(page) {
    const professores = await database('professores')
      .limit(10)
      .offset((page - 1) * 5)
      .select();

    let professoresReady = [];

    for (professor of professores) {
      const avaliacoes = await avaliacoesService.list(professor.id);
      let media = 0;

      for (avaliacao of avaliacoes) {
        media += avaliacao.avaliacao_conhecimento;
        media += avaliacao.avaliacao_didatica;
        media += avaliacao.avaliacao_tirar_duvidas;
        media += avaliacao.avaliacao_dialogo;
        media += avaliacao.avaliacao_metodo_avaliativo;
        media += avaliacao.avaliacao_conteudo_cobrado;
        media += avaliacao.avaliacao_correcao;
        media += avaliacao.avaliacao_materiais;
        media += avaliacao.avaliacao_cuidado_ofensivo;
      }

      media = (media / (9 * avaliacoes.length));

      professoresReady.push({
        id: professor.id,
        nome: professor.nome,
        qualificacao: professor.qualificacao,
        media,
        avaliacoes: avaliacoes.length
      })
    }

    return professoresReady
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
