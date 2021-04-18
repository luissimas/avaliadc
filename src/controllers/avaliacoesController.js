const connection = require('../database/connection');

module.exports = {
  async list(request, response, next) {
    try {
      const { professor_id } = request.body;

      const count = await connection('avaliacoes')
        .where('professor_id', professor_id)
        .count()
        .first();

      const avaliacoes = await connection('avaliacoes')
        .where('professor_id', professor_id)
        .select();

      // Retornando o total de avaliacoes do professor cadastrados pelo header da resposta
      response.header('X-Total-Count', count['count(*)']);

      return response.json(avaliacoes);
    } catch (error) {
      next(error);
    }
  },

  async create(request, response, next) {
    try {
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
        avaliacao_cobra_presenca,
        professor_id,
      } = request.body;

      // Verificando se o id é de um professor que existe
      const professor = await connection('professores')
        .where('id', professor_id)
        .select('id')
        .first();

      if (!professor) {
        return response
          .status(400)
          .json({ erro: 'Nengum professor com o id passado' });
      }

      await connection('avaliacoes').insert({
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
        avaliacao_cobra_presenca,
        professor_id,
      });

      return response.json({ message: 'avaliacao cadastrada com sucesso' });
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const {
        id,
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
        avaliacao_cobra_presenca,
        professor_id,
      } = request.body;

      const rows = await connection('avaliacoes').where('id', id).update({
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
        avaliacao_cobra_presenca: avaliacao_cobra_presenca,
        professor_id: professor_id,
      });

      if (rows === 0) {
        return response
          .status(400)
          .json({ error: 'Nenhuma avaliacao com esse id.' });
      }

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.body;

      // O método delete retorna o número de linhas afetadas, podemos usar isso para verificar se a operação foi bem sucedida
      const rows = await connection('avaliacoes').where('id', id).delete();

      if (rows === 0) {
        return response
          .status(400)
          .json({ error: 'Nenhuma avaliacao com esse id.' });
      }

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
