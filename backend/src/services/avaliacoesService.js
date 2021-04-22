const database = require('../database/connection');

module.exports = {
  async getCount(professor_id) {
    return await database('avaliacoes')
      .where('professor_id', professor_id)
      .count()
      .first();
  },

  async list(professor_id, page) {
    return await database('avaliacoes')
      .where('professor_id', professor_id)
      .limit(10)
      .offset((page - 1) * 10)
      .select();
  },

  async getMediaAvaliacoes(professor_id) {
    const avaliacoes = await database('avaliacoes')
      .where('professor_id', professor_id)
      .select();

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

    // Check if there are any avaliacoes in the array,
    // this prevents the return of NaN if there are no
    // avaliacoes for that professor
    if (avaliacoes.length > 0) {
      media = (media / (9 * avaliacoes.length)).toFixed(2);
    }

    return media;
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
