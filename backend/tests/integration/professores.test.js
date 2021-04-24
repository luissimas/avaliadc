const { randomString } = require('../../src/utils/generateRandom');
const { request } = require('../../src/utils/request');
const knex = require('../../src/database/connection');
const professoresService = require('../../src/services/professoresService');

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

test('Should list all professors', async () => {
  const professor1 = { nome: randomString(), qualificacao: randomString() };
  const professor2 = { nome: randomString(), qualificacao: randomString() };
  const professor3 = { nome: randomString(), qualificacao: randomString() };

  await professoresService.create(professor1.nome, professor1.qualificacao);
  await professoresService.create(professor2.nome, professor2.qualificacao);
  await professoresService.create(professor3.nome, professor3.qualificacao);

  const response = await request('/professores', 'get');

  expect(response.status).toBe(200);

  const professores = response.data;

  expect(professores).toHaveLength(3);

  expect(professores[0].nome).toBe(professor1.nome);
  expect(professores[0].qualificacao).toBe(professor1.qualificacao);

  expect(professores[1].nome).toBe(professor2.nome);
  expect(professores[1].qualificacao).toBe(professor2.qualificacao);

  expect(professores[2].nome).toBe(professor3.nome);
  expect(professores[2].qualificacao).toBe(professor3.qualificacao);
});

test('Should list professor by Id', async () => {
  const professor = { nome: randomString(), qualificacao: randomString() };

  await professoresService.create(professor.nome, professor.qualificacao);

  // Buscando pelo professor com o id 1 (primeiro inserido)
  const response = await request('/professores/1', 'get');

  expect(response.status).toBe(200);

  expect(response.data.nome).toBe(professor.nome);
  expect(response.data.qualificacao).toBe(professor.qualificacao);
});

test('Should create professor', async () => {
  const professor = { nome: randomString(), qualificacao: randomString() };

  // Inserindo através de uma request
  const response = await request('/professores', 'post', professor);

  expect(response.status).toBe(204);

  const professoresRegistered = await professoresService.list(1);

  expect(professoresRegistered).toHaveLength(1);

  expect(professoresRegistered[0].nome).toBe(professor.nome);
  expect(professoresRegistered[0].qualificacao).toBe(professor.qualificacao);
});

test('Should update professor', async () => {
  const professor = { nome: randomString(), qualificacao: randomString() };
  const professorModified = {
    nome: randomString(),
    qualificacao: randomString(),
  };

  await professoresService.create(professor.nome, professor.qualificacao);

  // Modificando através de uma request
  const response = await request('/professores/1', 'put', professorModified);

  expect(response.status).toBe(204);

  const professoresRegistered = await professoresService.list(1);

  expect(professoresRegistered).toHaveLength(1);

  expect(professoresRegistered[0].nome).toBe(professorModified.nome);
  expect(professoresRegistered[0].qualificacao).toBe(
    professorModified.qualificacao
  );
});

test('Should delete professor', async () => {
  const professor = { nome: randomString(), qualificacao: randomString() };

  await professoresService.create(professor.nome, professor.qualificacao);

  const [{ id }] = await professoresService.list(1);

  // Deletando através de uma request
  const response = await request(`/professores/${id}`, 'delete');

  expect(response.status).toBe(204);

  const professoresRegistered = await professoresService.list();

  expect(professoresRegistered).toHaveLength(0);
});
