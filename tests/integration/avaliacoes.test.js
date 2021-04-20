const {
  randomString,
  randomNota,
  randomBool,
} = require('../utils/generateRandom');

const { request } = require('../utils/request');
const knex = require('../../src/database/connection');
const professoresService = require('../../src/services/professoresService');
const avaliacoesService = require('../../src/services/avaliacoesService');

// Drop and re-create database tables
beforeEach(async () => {
  await knex.migrate.latest();
});

afterEach(async () => {
  await knex.migrate.rollback();
});

//Kill database connection
afterAll(async () => {
  await knex.destroy();
});

test('Should get avaliacoes from professor', async () => {
  // Criando um professor para avaliar
  await professoresService.create(randomString(), randomString());

  const avaliacao = {
    curso: 'BCC',
    ano_ingresso: 2020,
    comentario: randomString(),
    avaliacao_conhecimento: randomNota(),
    avaliacao_didatica: randomNota(),
    avaliacao_tirar_duvidas: randomNota(),
    avaliacao_dialogo: randomNota(),
    avaliacao_metodo_avaliativo: randomNota(),
    avaliacao_conteudo_cobrado: randomNota(),
    avaliacao_correcao: randomNota(),
    avaliacao_materiais: randomNota(),
    avaliacao_cuidado_ofensivo: randomNota(),
    cobra_presenca: randomBool(),
    professor_id: 1,
  };

  // Criando avaliacao com o código de professor = 1 (criado anteriormente)
  await avaliacoesService.create(avaliacao);

  // Buscando pelas avaliacoes do primeiro professor
  const response = await request('/avaliacoes/1', 'get');

  expect(response.status).toBe(200);

  const [avaliacaoRegistered] = response.data;

  expect(avaliacaoRegistered.curso).toBe(avaliacao.curso);
  expect(avaliacaoRegistered.comentario).toBe(avaliacao.comentario);
  expect(avaliacaoRegistered.avaliacao_conhecimento).toBe(
    avaliacao.avaliacao_conhecimento
  );
  expect(avaliacaoRegistered.professor_id).toBe(avaliacao.professor_id);
});

test('Should create avaliacao', async () => {
  // Criando um professor para avaliar
  await professoresService.create(randomString(), randomString());

  const avaliacao = {
    curso: 'BCC',
    ano_ingresso: 2020,
    comentario: randomString(),
    avaliacao_conhecimento: randomNota(),
    avaliacao_didatica: randomNota(),
    avaliacao_tirar_duvidas: randomNota(),
    avaliacao_dialogo: randomNota(),
    avaliacao_metodo_avaliativo: randomNota(),
    avaliacao_conteudo_cobrado: randomNota(),
    avaliacao_correcao: randomNota(),
    avaliacao_materiais: randomNota(),
    avaliacao_cuidado_ofensivo: randomNota(),
    cobra_presenca: randomBool(),
    professor_id: 1,
  };

  const response = await request('/avaliacoes', 'post', avaliacao);

  expect(response.status).toBe(204);

  const avaliacaoRegistered = await avaliacoesService.list(
    avaliacao.professor_id
  );

  expect(avaliacaoRegistered).toHaveLength(1);

  expect(avaliacaoRegistered[0].curso).toBe(avaliacao.curso);
  expect(avaliacaoRegistered[0].comentario).toBe(avaliacao.comentario);
  expect(avaliacaoRegistered[0].avaliacao_conhecimento).toBe(
    avaliacao.avaliacao_conhecimento
  );
  expect(avaliacaoRegistered[0].professor_id).toBe(avaliacao.professor_id);
});

test('Should update', async () => {
  // Criando um professor para avaliar
  await professoresService.create(randomString(), randomString());

  const avaliacao = {
    curso: 'BCC',
    ano_ingresso: 2020,
    comentario: randomString(),
    avaliacao_conhecimento: randomNota(),
    avaliacao_didatica: randomNota(),
    avaliacao_tirar_duvidas: randomNota(),
    avaliacao_dialogo: randomNota(),
    avaliacao_metodo_avaliativo: randomNota(),
    avaliacao_conteudo_cobrado: randomNota(),
    avaliacao_correcao: randomNota(),
    avaliacao_materiais: randomNota(),
    avaliacao_cuidado_ofensivo: randomNota(),
    cobra_presenca: randomBool(),
    professor_id: 1,
  };

  const avaliacaoModified = {
    curso: 'ENC',
    ano_ingresso: 2019,
    comentario: randomString(),
    avaliacao_conhecimento: randomNota(),
    avaliacao_didatica: randomNota(),
    avaliacao_tirar_duvidas: randomNota(),
    avaliacao_dialogo: randomNota(),
    avaliacao_metodo_avaliativo: randomNota(),
    avaliacao_conteudo_cobrado: randomNota(),
    avaliacao_correcao: randomNota(),
    avaliacao_materiais: randomNota(),
    avaliacao_cuidado_ofensivo: randomNota(),
    cobra_presenca: randomBool(),
  };

  // Criando avaliacao com o código de professor = 1 (criado anteriormente)
  await avaliacoesService.create(avaliacao);

  // Modificando através de uma request
  const response = await request('/avaliacoes/1', 'put', avaliacaoModified);

  expect(response.status).toBe(204);

  const [avaliacaoRegistered] = await avaliacoesService.list(avaliacao.professor_id)

  expect(avaliacaoRegistered.curso).toBe(avaliacaoModified.curso);
  expect(avaliacaoRegistered.comentario).toBe(avaliacaoModified.comentario);
  expect(avaliacaoRegistered.avaliacao_conhecimento).toBe(
    avaliacaoModified.avaliacao_conhecimento
  );
});

test('Should delete avaliacao', async () => {
  // Criando um professor para avaliar
  await professoresService.create(randomString(), randomString());

  const avaliacao = {
    curso: 'BCC',
    ano_ingresso: 2020,
    comentario: randomString(),
    avaliacao_conhecimento: randomNota(),
    avaliacao_didatica: randomNota(),
    avaliacao_tirar_duvidas: randomNota(),
    avaliacao_dialogo: randomNota(),
    avaliacao_metodo_avaliativo: randomNota(),
    avaliacao_conteudo_cobrado: randomNota(),
    avaliacao_correcao: randomNota(),
    avaliacao_materiais: randomNota(),
    avaliacao_cuidado_ofensivo: randomNota(),
    cobra_presenca: randomBool(),
    professor_id: 1,
  };

  await avaliacoesService.create(avaliacao)

  const [{ id }] = await avaliacoesService.list(avaliacao.professor_id)

  // Deletando através de uma request
  const response = await request(`/avaliacoes/${id}`, 'delete');

  expect(response.status).toBe(204)

  const avaliacaoRegistered = await avaliacoesService.list(avaliacao.professor_id)

  expect(avaliacaoRegistered).toHaveLength(0)

});
