const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  list: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().positive(),
    }),
  }),

  get: celebrate({
    [Segments.PARAMS]: Joi.alternatives([
      Joi.object().keys({
        searchArg: Joi.number().integer().positive().required(),
      }),
      Joi.object().keys({
        searchArg: Joi.string().min(1),
      }),
    ]),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().positive(),
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
