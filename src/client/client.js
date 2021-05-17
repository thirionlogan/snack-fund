const axios = require('axios').default;
const API_SERVER = 'http://localhost:3001';

const instance = axios.create({ withCredentials: true, baseURL: API_SERVER });

const client = {
  createUser: ({ name, rank, balance }) =>
    instance.post('/user', { name, rank, balance }),
  getUsers: () => instance.get('/user'),
  getUserById: (id) => instance.get(`/user/${id}`),
  updateUser: (id, user) => instance.patch(`/user/${id}`, user),
  deleteUser: (id) => instance.delete(`/user/${id}`),
  createTransaction: (userId, amount) =>
    instance.post(`/transaction/${userId}`, { amount }),
  getReport: (startDate, endDate) => instance.get('/report'),
};

module.exports = client;
