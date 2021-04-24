const generate = require('../../utils/generateRandom.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('avaliacoes')
    .del()
    .then(function () {
      let i;
      let avaliacoesArray = [];

      let cursosArray = ['BCC', 'ENC', 'Outro'];

      let comentariosArray = [
        'Acho muito top',
        'Cara muito bom',
        'Xingou minha família',
        'Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o acompanhamento das preferências de consumo assume importantes posições no estabelecimento de alternativas às soluções ortodoxas. Por outro lado, a adoção de políticas descentralizadoras estende o alcance e a importância das novas proposições. Ainda assim, existem dúvidas a respeito de como a determinação clara de objetivos é uma das consequências do remanejamento dos quadros funcionais.',
        'É claro que o consenso sobre a necessidade de qualificação possibilita uma melhor visão global das condições financeiras e administrativas exigidas. Podemos já vislumbrar o modo pelo qual a percepção das dificuldades ainda não demonstrou convincentemente que vai participar na mudança do orçamento setorial. Desta maneira, o entendimento das metas propostas causa impacto indireto na reavaliação do fluxo de informações. O incentivo ao avanço tecnológico, assim como a constante divulgação das informações oferece uma interessante oportunidade para verificação do investimento em reciclagem técnica.',
      ];

      for (i = 0; i < 500; i++) {
        avaliacoesArray.push({
          curso: cursosArray[generate.randomNumber(0, 2)],
          ano_ingresso: 2010 + generate.randomNumber(0, 11),
          comentario: comentariosArray[generate.randomNumber(0, 4)],
          avaliacao_conhecimento: generate.randomNumber(1, 5),
          avaliacao_didatica: generate.randomNumber(1, 5),
          avaliacao_tirar_duvidas: generate.randomNumber(1, 5),
          avaliacao_dialogo: generate.randomNumber(1, 5),
          avaliacao_metodo_avaliativo: generate.randomNumber(1, 5),
          avaliacao_conteudo_cobrado: generate.randomNumber(1, 5),
          avaliacao_correcao: generate.randomNumber(1, 5),
          avaliacao_materiais: generate.randomNumber(1, 5),
          avaliacao_cuidado_ofensivo: generate.randomNumber(1, 5),
          cobra_presenca: generate.randomBool(),
          professor_id: generate.randomNumber(1, 43),
        });
      }

      // Inserts seed entries
      return knex('avaliacoes').insert(avaliacoesArray);
    });
};
