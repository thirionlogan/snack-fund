const app = require('./app');
const request = require('supertest')(app);
const db = require('../data/db');

describe('Endpoints', () => {
  describe('404', () => {
    it('should respond with 404', async () => {
      const response = await request.get('/doesNotExist');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('resource not found');
    });
  });
  describe('/user', () => {
    it('should respond with 200 when POST is called', async () => {
      const response = await request
        .post('/user')
        .send({ name: 'Rob', rank: 'TSgt' });
      expect(response.statusCode).toBe(200);
    });
    it('should respond with 200 when GET', async () => {
      const response = await request.get('/user');
      expect(response.statusCode).toBe(200);
    });
    it('should respond with 200 when GET is called', async () => {
      const response = await request.get('/user/1');
    });
    it('should respond with 200 when PATCH is called', async () => {
      const response = await request.patch('/user/1').send({ rank: 'Bob' });
    });
    it('should respond with 200 when DELETE is called', async () => {
      const response = await request.delete('/user/1');
    });
  });
  describe('/transaction', () => {
    it('should respond with 200 when POST is called', async () => {
      const response = await request
        .post('/transaction/1')
        .send({ amount: 1000 });
    });
  });
});
