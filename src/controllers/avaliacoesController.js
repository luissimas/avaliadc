const avaliacoesService = require('../services/avaliacoesService');
const professoresService = require('../services/professoresService');

module.exports = {
  async list(request, response, next) {
    try {
      const { professor_id } = request.params;

      // Verificando se o id é de um professor que existe
      const professor = await professoresService.getById(professor_id);

      if (!professor) {
        return response.status(404).send();
      }

      const count = await avaliacoesService.getCount(professor_id);

      const avaliacoes = await avaliacoesService.list(professor_id);
      const media = await avaliacoesService.getMediaAvaliacoes(professor_id);

      // Retornando o total de avaliacoes do professor cadastrados pelo header da resposta
      response.header('X-Total-Count', count['count(*)']);

      return response.json({media, avaliacoes});
    } catch (error) {
      next(error);
    }
  },

  async create(request, response, next) {
    try {
      const avaliacao = request.body;

      const { professor_id } = avaliacao;

      // Verificando se o id é de um professor que existe
      const professor = await professoresService.getById(professor_id);

      if (!professor) {
        return response.status(404).send();
      }

      await avaliacoesService.create(avaliacao)

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { id } = request.params;
      const avaliacao = request.body;

      const rows = await avaliacoesService.update(id, avaliacao)

      if (rows === 0) {
        return response.status(404).send();
      }

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.params;

      // O método delete retorna o número de linhas afetadas, podemos usar isso para verificar se a operação foi bem sucedida
      const rows = await avaliacoesService.delete(id)

      if (rows === 0) {
        return response.status(404).send();
      }

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
