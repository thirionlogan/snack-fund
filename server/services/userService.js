const { User } = require('../models');
const { createTransaction } = require('./transactionService');

const convertTransactions = (user) => ({
  ...user,
  transactions: user.balance,
  balance: user.balance.reduce((a, b) => a + b.amount, 0),
});

const createUser = ({ name, rank, balance }) =>
  new User({ name, rank })
    .save(null, { required: true })
    .then(({ id }) => createTransaction(id, balance));

const getUsers = (filterInactive = true) =>
  User.fetchAll({
    required: true,
    withRelated: ['balance'],
  }).then((userCollection) =>
    userCollection
      .toJSON()
      .filter(({ active }) => !filterInactive || active)
      .map(convertTransactions)
  );

const getUserById = (id) =>
  User.where({ id })
    .fetch({
      required: true,
      withRelated: ['balance'],
    })
    .then((userModel) => convertTransactions(userModel.toJSON()));

const updateUser = (id, user) =>
  new User({ id }).save({ ...user }, { required: true, patch: true });

const deleteUser = (id) =>
  new User({ id }).save({ active: false }, { required: true, patch: true });

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
