const connection = require('../database/connection');

module.exports = {
  async list(request, response) {
    const { page = 1 } = request.query;

    const count = await connection('professores').count().first();

    const professores = await connection('professores')
      .limit(10)
      .offset((page - 1) * 5)
      .select();

    // Retornando o total de professores cadastrados pelo header da resposta
    response.header('X-Total-Count', count['count(*)']);

    return response.json(professores);
  },

  async create(request, response) {
    const { nome, qualificacao } = request.body;

    await connection('professores').insert({
      nome,
      qualificacao,
    });

    return response.json({ message: 'professor cadastrado com sucesso' });
  },

  async delete(request, response) {
    const { id } = request.body;

    // O método delete retorna o número de linhas afetadas, podemos usar isso para verificar se a operação foi bem sucedida
    const rows = await connection('professores').where('id', id).delete();

    if (rows === 0) {
      return response
        .status(400)
        .json({ error: 'Nenhum professor com esse id.' });
    }

    return response.status(204).send();
  },

  async update(request, response) {
    const { id, nome, qualificacao } = request.body;

    const rows = await connection('professores').where('id', id).update({
      nome: nome,
      qualificacao: qualificacao,
    });

    if (rows === 0) {
      return response
        .status(400)
        .json({ error: 'Nenhum professor com esse id.' });
    }

    return response.status(204).send();
  },
};
