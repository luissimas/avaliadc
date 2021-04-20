const serviceProfessores = require('../services/professoresService');

module.exports = {
  async list(request, response, next) {
    try {
      const { page = 1 } = request.query;

      const count = await serviceProfessores.getCount();

      const professores = await serviceProfessores.list(page);

      // Retornando o total de professores cadastrados pelo header da resposta
      response.header('X-Total-Count', count['count(*)']);

      return response.json(professores);
    } catch {
      next(error);
    }
  },

  async listById(request, response, next) {
    try {
      const { id } = request.params;

      const professor = await serviceProfessores.getById(id);

      if (!professor) {
        return response.status(404).send();
      }

      return response.json(professor);
    } catch (error) {
      next(error);
    }
  },

  async create(request, response, next) {
    try {
      const { nome, qualificacao } = request.body;

      await serviceProfessores.create(nome, qualificacao);

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { nome, qualificacao } = request.body;

      const rows = await serviceProfessores.update(id, nome, qualificacao);

      if (rows === 0) {
        return response.status(404).send();
      }

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.params;

      // O método delete retorna o número de linhas afetadas, podemos usar isso para verificar se a operação foi bem sucedida
      const rows = await serviceProfessores.delete(id);

      if (rows === 0) {
        return response.status(404).send();
      }

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
