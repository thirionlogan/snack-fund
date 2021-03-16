const { User } = require('../models');
const { createTransaction } = require('./transactionService');

const createUser = ({ name, rank, balance }) =>
  new User({ name, rank })
    .save({ required: true })
    .then((id) => createTransaction(id, balance));

const getUsers = () => User.fetchAll({ required: true });

const getUserById = (id) => new User({ id }).fetch({ required: true });

const updateUser = (id, user) =>
  new User({ id, ...user }).save({ required: true });

const deleteUser = (id) => new User({ id }).destroy({ required: true });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
