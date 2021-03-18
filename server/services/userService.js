const { User } = require('../models');
const { createTransaction } = require('./transactionService');

const createUser = ({ name, rank, balance }) =>
  new User({ name, rank })
    .save(null, { required: true })
    .then((id) => createTransaction(id, balance));

const getUsers = () =>
  User.fetchAll({ required: true, withRelated: ['balance'] });

const getUserById = (id) =>
  User.where({ id }).fetch({
    required: true,
    withRelated: ['balance'],
  });

const updateUser = (id, user) =>
  new User({ id, ...user }).save(null, { required: true, patch: true });

const deleteUser = (id) => new User({ id }).destroy({ required: true });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
