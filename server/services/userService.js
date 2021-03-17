const { User } = require('../models');
const { createTransaction } = require('./transactionService');

const createUser = ({ name, rank, balance }) =>
  new User({ name, rank })
    .save(null, { required: true })
    .then((id) => createTransaction(id, balance));

const getUsers = () => User.fetchAll(null, { required: true });

const getUserById = (id) => new User({ id }).fetch(null, { required: true });

const updateUser = (id, user) =>
  new User({ id, ...user }).save(null, { required: true });

const deleteUser = (id) => new User({ id }).destroy(null, { required: true });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
