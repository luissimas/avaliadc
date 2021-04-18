const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  list: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      professor_id: Joi.number().integer().positive().required(),
    }),
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      curso: Joi.string().min(2).required(),
      ano_ingresso: Joi.number().integer().min(2000).required(),
      comentario: Joi.string().min(4).optional(),
      avaliacao_conhecimento: Joi.number().integer().positive().max(5),
      avaliacao_didatica: Joi.number().integer().positive().max(5),
      avaliacao_tirar_duvidas: Joi.number().integer().positive().max(5),
      avaliacao_dialogo: Joi.number().integer().positive().max(5),
      avaliacao_metodo_avaliativo: Joi.number().integer().positive().max(5),
      avaliacao_conteudo_cobrado: Joi.number().integer().positive().max(5),
      avaliacao_correcao: Joi.number().integer().positive().max(5),
      avaliacao_materiais: Joi.number().integer().positive().max(5),
      avaliacao_cuidado_ofensivo: Joi.number().integer().positive().max(5),
      avaliacao_cobra_presenca: Joi.number().integer().positive().max(5),
      professor_id: Joi.number().integer().positive().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      curso: Joi.string().min(2).required(),
      ano_ingresso: Joi.number().integer().min(2000).required(),
      comentario: Joi.string().min(4).optional(),
      avaliacao_conhecimento: Joi.number().integer().positive().max(5),
      avaliacao_didatica: Joi.number().integer().positive().max(5),
      avaliacao_tirar_duvidas: Joi.number().integer().positive().max(5),
      avaliacao_dialogo: Joi.number().integer().positive().max(5),
      avaliacao_metodo_avaliativo: Joi.number().integer().positive().max(5),
      avaliacao_conteudo_cobrado: Joi.number().integer().positive().max(5),
      avaliacao_correcao: Joi.number().integer().positive().max(5),
      avaliacao_materiais: Joi.number().integer().positive().max(5),
      avaliacao_cuidado_ofensivo: Joi.number().integer().positive().max(5),
      avaliacao_cobra_presenca: Joi.number().integer().positive().max(5),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
  }),
};
