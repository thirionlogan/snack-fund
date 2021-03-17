const { Transaction } = require('../models');

const createTransaction = (userId, amount) =>
  new Transaction({ user_id: userId, amount }).save(null, { required: true });

module.exports = { createTransaction };
