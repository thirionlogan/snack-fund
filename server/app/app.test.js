const app = require('./app');
const request = require('supertest')(app);
const db = require('../data/db');

describe('Endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest().then(() => db.seed.run());
  });
  afterAll(async () => {
    await db.migrate.rollback();
  });

  describe('404', () => {
    it('should respond with 404', async () => {
      const response = await request.get('/doesNotExist');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Not found');
    });
  });
  describe('/user', () => {
    it('should respond with 201 when POST is called', async () => {
      const response = await request
        .post('/user')
        .send({ name: 'Rob', rank: 'TSgt' });
      expect(response.statusCode).toBe(201);
    });
    it('should respond with 200 when GET is called', async () => {
      const expectedResponse = expect.arrayContaining([
        expect.objectContaining({
          rank: 'SrA',
          name: 'Thirion',
          balance: 500,
        }),
        expect.objectContaining({ rank: 'SrA', name: 'Shaw', balance: 2000 }),
        expect.objectContaining({ rank: 'SSgt', name: 'Monroe', balance: 500 }),
        expect.objectContaining({
          rank: 'TSgt',
          name: 'Drevon',
          balance: -100,
        }),
        expect.objectContaining({ rank: 'A1C', name: 'Wilson', balance: 2500 }),
        expect.objectContaining({
          rank: 'TSgt',
          name: 'Messler',
          balance: -325,
        }),
      ]);
      const response = await request.get('/user');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
    it('should respond with 200 when GET ID is called', async () => {
      const expectedResponse = expect.objectContaining({
        id: 1,
        name: 'Thirion',
        rank: 'SrA',
        balance: 500,
      });

      const response = await request.get('/user/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
    it('should respond with 204 when PATCH is called', async () => {
      const response = await request.patch('/user/1').send({ rank: 'Bob' });
      expect(response.statusCode).toBe(204);
    });
    it('should respond with 200 when DELETE is called', async () => {
      const response = await request.delete('/user/1');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('/transaction', () => {
    it('should respond with 204 when POST is called', async () => {
      const response = await request
        .post('/transaction/1')
        .send({ amount: 1000 });
      expect(response.statusCode).toBe(204);
    });
  });

  describe('/report', () => {
    it('should respond with a report.xlsx', async () => {
      const response = await request.get('/report');
      expect(response.statusCode).toBe(200);
    });
  });
});
