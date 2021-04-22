const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  list: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().positive(),
    }),
  }),

  listById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().min(4).required(),
      qualificacao: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().min(4).required(),
      qualificacao: Joi.string().required(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
  }),
};
