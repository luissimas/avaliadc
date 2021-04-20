const database = require('../database/connection');

module.exports = {
  async getCount(professor_id) {
    return await database('avaliacoes')
      .where('professor_id', professor_id)
      .count()
      .first();
  },

  async list(professor_id) {
    return await database('avaliacoes')
      .where('professor_id', professor_id)
      // .join('professores', 'professores.id', '=', 'avaliacoes.professor_id')
      .select();
  },

  async create(avaliacao) {
    const {
      curso,
      ano_ingresso,
      comentario,
      avaliacao_conhecimento,
      avaliacao_didatica,
      avaliacao_tirar_duvidas,
      avaliacao_dialogo,
      avaliacao_metodo_avaliativo,
      avaliacao_conteudo_cobrado,
      avaliacao_correcao,
      avaliacao_materiais,
      avaliacao_cuidado_ofensivo,
      cobra_presenca,
      professor_id,
    } = avaliacao;

    return await database('avaliacoes').insert({
      curso,
      ano_ingresso,
      comentario,
      avaliacao_conhecimento,
      avaliacao_didatica,
      avaliacao_tirar_duvidas,
      avaliacao_dialogo,
      avaliacao_metodo_avaliativo,
      avaliacao_conteudo_cobrado,
      avaliacao_correcao,
      avaliacao_materiais,
      avaliacao_cuidado_ofensivo,
      cobra_presenca,
      professor_id,
    });
  },

  async update(id, avaliacao) {
    const {
      curso,
      ano_ingresso,
      comentario,
      avaliacao_conhecimento,
      avaliacao_didatica,
      avaliacao_tirar_duvidas,
      avaliacao_dialogo,
      avaliacao_metodo_avaliativo,
      avaliacao_conteudo_cobrado,
      avaliacao_correcao,
      avaliacao_materiais,
      avaliacao_cuidado_ofensivo,
      cobra_presenca,
    } = avaliacao;

    return await database('avaliacoes').where('id', id).update({
      curso: curso,
      ano_ingresso: ano_ingresso,
      comentario: comentario,
      avaliacao_conhecimento: avaliacao_conhecimento,
      avaliacao_didatica: avaliacao_didatica,
      avaliacao_tirar_duvidas: avaliacao_tirar_duvidas,
      avaliacao_dialogo: avaliacao_dialogo,
      avaliacao_metodo_avaliativo: avaliacao_metodo_avaliativo,
      avaliacao_conteudo_cobrado: avaliacao_conteudo_cobrado,
      avaliacao_correcao: avaliacao_correcao,
      avaliacao_materiais: avaliacao_materiais,
      avaliacao_cuidado_ofensivo: avaliacao_cuidado_ofensivo,
      cobra_presenca: cobra_presenca,
    });
  },

  async delete(id) {
    return await database('avaliacoes').where('id', id).delete();
  },
};
