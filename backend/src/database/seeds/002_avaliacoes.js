exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('avaliacoes')
    .del()
    .then(function () {
      let i;
      let avaliacoesArray = [];

      for (i = 0; i < 20; i++) {
        avaliacoesArray.push({
          curso: 'BCC',
          ano_ingresso: 2020,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: true,
          professor_id: 3,
        });
      }

      for (i = 0; i < 6; i++) {
        avaliacoesArray.push({
          curso: 'BCC',
          ano_ingresso: 2020,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: true,
          professor_id: 3,
        });
      }

      // Inserts seed entries
      return knex('avaliacoes').insert([
        ...avaliacoesArray,
        {
          curso: 'BCC',
          ano_ingresso: 2020,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: true,
          professor_id: 3,
        },
        {
          curso: 'ENC',
          ano_ingresso: 2018,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: true,
          professor_id: 1,
        },
        {
          curso: 'BCC',
          ano_ingresso: 2021,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: false,
          professor_id: 3,
        },
        {
          curso: 'BCC',
          ano_ingresso: 2021,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: false,
          professor_id: 2,
        },
        {
          curso: 'ENC',
          ano_ingresso: 2020,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: false,
          professor_id: 2,
        },
        {
          curso: 'ENC',
          ano_ingresso: 2019,
          comentario: 'Acho isso isso e aquilo',
          avaliacao_conhecimento: 4,
          avaliacao_didatica: 3,
          avaliacao_tirar_duvidas: 2,
          avaliacao_dialogo: 5,
          avaliacao_metodo_avaliativo: 2,
          avaliacao_conteudo_cobrado: 4,
          avaliacao_correcao: 2,
          avaliacao_materiais: 4,
          avaliacao_cuidado_ofensivo: 2,
          cobra_presenca: true,
          professor_id: 1,
        },
      ]);
    });
};
